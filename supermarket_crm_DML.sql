USE SUPERMARKET_CRM;

-- ======= 1. Trang thông tin cá nhân của khách hàng
-- Khách hàng truy xuất thông tin cá nhân dựa trên SSN của khách hàng đó
SELECT * FROM CUSTOMER WHERE SSN = '${CustomerSSN}';

-- Khách hàng cập nhật thông tin cá nhân --
UPDATE CUSTOMER
SET fName = '${fName}',
    lName = '${lName}',
    phone = '${phone}',
    email = '${email}',
    birthday = '${birthday}',
    favorite = '${favorite}'
WHERE SSN = '${CustomerSSN}';

-- ======= 2. Trang khách hàng gửi phản hồi
INSERT INTO FEEDBACK VALUES ('${CustomerSSN}', '${datetime.NOW()}', '${title}', '${star}', '${content}');

-- ======= 3. Trang xem lại lịch sử mua sắm của khách hàng

--  Khách hàng xem lịch sử mua sắm 
--  Với một tập dữ liệu lớn, không thể load 1 lần hết tất cả các record, mà phải sử dụng pagination
--  Kiểu dữ liệu cho phần PRODUCT.discount là một VARCHAR. 
--  Tuỳ vào giá trị của PRODUCT.discount, nếu PRODUCT.discount là NULL không có sự giảm giá, 
--      nếu chứa kí tự % sẽ quy đổi ra giá trị phần trăm và nhân với PRODUCT.price, 
--      nếu chỉ chứa kí tự số sẽ trừ thẳng và PRODUCT.price
DROP PROCEDURE IF EXISTS GET_PURCHASE_LIST;
delimiter //
CREATE PROCEDURE GET_PURCHASE_LIST(IN cssn INT, IN beginIndex INT, IN numItemsPerPage INT)
    BEGIN
        SELECT
            PURCHASE.ID as purchaseID, PURCHASE.`time`, 
            PRODUCT.ID as productID, PRODUCT.`name` as productName,
            SUPERMARKET_BRANCH.`name` as branchName, SUPERMARKET_BRANCH.`address` as branchAddr, SUPERMARKET_BRANCH.hotline as branchHotline
            score, price, numberOfProducts
        FROM (
            PURCHASE JOIN TRANSACTS 
                ON PURCHASE.ID = TRANSACTS.purchaseID 
            JOIN PRODUCT 
                ON TRANSACTS.productID = PRODUCT.ID)
        WHERE PURCHASE.cssn = cssn
        ORDER BY `time` DESC
        -- ???
        GROUP BY PURCHASE.ID
        LIMIT numItemsPerPage OFFSET beginIndex;
    END //
delimiter ;

-- ======= 4. Kho lưu trữ ưu đãi cá nhân của khách hàng
SELECT 
    VOUCHER_COUPON.code as code, 
    VOUCHER_COUPON.`type` as `type`, 
    FAVOUR.*
FROM VOUCHER_COUPON JOIN FAVOUR ON VOUCHER_COUPON.favourID = FAVOUR.ID 
WHERE VOUCHER_COUPON.code IN (
    SELECT OWNS.vcode FROM OWNS
    WHERE OWNS.cssn = '${CustomerSSN}'
) AND VOUCHER_COUPON.isUsed = 'n' AND FAVOUR.`status` = 'applying';

-- Xóa ưu đãi khỏi kho lưu trữ cá nhân của khách hàng
DELETE FROM OWNS WHERE vcode='${vcode}';

-- ======= 5. Khách hàng xem trang thông báo
-- Sử dụng paging để xử lý lượng dữ liệu lớn
DROP PROCEDURE IF EXISTS GET_NOTIFICATION_LIST;
delimiter //
CREATE PROCEDURE GET_NOTIFICATION_LIST(IN cssn INT, IN beginIndex INT, IN numItemsPerPage INT)
    BEGIN
        SELECT `time`, title, content, `url`, imageUrl
        FROM NOTICES
        WHERE (ass_ssn, `time`) IN (
            SELECT ass_ssn, `time` FROM RECEIVES
            WHERE RECEIVES.cssn = cssn
        )
        ORDER BY `time` DESC
        LIMIT numItemsPerPage OFFSET beginIndex;
    END //
delimiter ;

-- ======= 1. Nhân viên truy xuất thông tin của khách hàng
-- Trả về thông tin khách hàng dựa vào ssn của khách hàng 
SELECT * FROM CUSTOMER WHERE ssn = '${ssn}';

-- ======= 2. Nhân viên xem thông tin thống kê khách hàng

-- Hàm GET_COUNT_PURCHASE trả về số lần khách hàng mua hàng trong numday ngày gần đây (VD numday=7 là trong 1 tuần trở lại)
DROP function IF EXISTS `GET_COUNT_PURCHASE`;
delimiter //
CREATE DEFINER=`root`@`localhost` FUNCTION `GET_COUNT_PURCHASE`(ssn INT, numday INT) RETURNS int(11)
BEGIN
	DECLARE count_purchase INT default 0;
    SET count_purchase =  (SELECT COUNT(*)
        FROM PURCHASE 
        WHERE cssn=ssn AND (SELECT TIMESTAMPDIFF(SECOND, `time`, NOW()) < numday * 86400)
    );
	RETURN count_purchase;
END //
delimiter ;

-- Ứng dụng hàm GET_COUNT_PURCHASE
SELECT (GET_COUNT_PURCHASE('${cssn}','${numday}')) as COUNT_PURCHASE;

-- Trả về danh sách các sản phẩm được mua và số lần mua
-- Từ đó ứng dụng có thể tính toán loại sản phẩm mua nhiều nhất và phần trăm các loại sản phẩm
SELECT `name`, COUNT(*)
FROM TRANSACTS, PRODUCT
WHERE productID=ID AND purchaseID IN (SELECT ID
		FROM PURCHASE 
		WHERE cssn= '${ssn}')
GROUP BY ID;

-- Hàm GET_TOTAL_MONEY trả về tổng số tiền khách hàng đã mua trong numday ngày trở lại (VD: numday=7 là trong 1 tuần trở lại)
DROP FUNCTION IF EXISTS `GET_TOTAL_MONEY`;
delimiter //
CREATE DEFINER=`root`@`localhost` FUNCTION `GET_TOTAL_MONEY`(cssn INT, numday INT) RETURNS int(11)
BEGIN
	RETURN (SELECT SUM(numberOfProducts*price)
		FROM TRANSACTS, PRODUCT
		WHERE productID=ID AND purchaseID IN (SELECT ID
				FROM PURCHASE 
				WHERE cssn=cssn AND (SELECT TIMESTAMPDIFF(SECOND, `time`,NOW()) < numday*86400)));
END // 
delimiter ;

-- Ứng dụng hàm GET_TOTAL_MONEY
SELECT GET_TOTAL_MONEY('${cssn}','${numday}');

-- ========= 3. Nhân viên xem danh sách khách hàng
-- Tìm kiếm khách hàng bằng keyword: input
SELECT * FROM CUSTOMER WHERE phone LIKE '%${input}%' OR email LIKE '%${input}%';

-- Trả về danh sách khách hàng 
delimiter //
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_CUSTOMER_LIST`(IN beginIndex INT, IN numItemsPerPage INT, IN typeCustomer VARCHAR(6))
BEGIN
	SELECT *
	FROM CUSTOMER
	WHERE (score<5000 AND typeCustomer='bronze') 
		OR (score>=5000 AND score<10000 AND typeCustomer='silver')
		OR (score>10000 AND typeCustomer='gold')
        OR (typeCustomer='all')
	ORDER BY `fname`
    LIMIT numItemsPerPage OFFSET beginIndex;
END // 
delimiter ; 

-- Áp dụng GET_CUSTOMER_LIST
call GET_CUSTOMER_LIST('${beginIndex}','${numItemsPerPage}','${typeCustomer}');

-- =========== 4. Nhân viên trả lời phản hồi của khách hàng
-- Tìm kiếm phản hồi bằng keyword: input
-- INPUT: input
SELECT fname,lname,`time`,stars,title,content
FROM FEEDBACK, CUSTOMER
WHERE ssn=cssn AND fname LIKE '%${input}%' OR lname LIKE '%${input}%' OR content LIKE '%${content}%' 
ORDER BY `time` DESC; 

-- Trả về danh sách phản hồi của khách hàng
SELECT fname,lname,`time`,stars, title, content
FROM FEEDBACK, CUSTOMER
WHERE ssn = cssn
ORDER BY `time` DESC; 

-- Nhân viên phản hồi đánh giá của khách hàng
INSERT INTO RESOLVES (ass_ssn,cssn,feedbackTime,resolveTime,content) 
VALUES ('${ass_ssn}','${cssn}','${feedbackTime}','${datetime.NOW()}','${content}'); 

-- ============= 5. Nhân viên gửi thông báo cho khách hàng
-- Nhân viên tạo thông báo
INSERT INTO NOTICES (ass_ssn, `time`, content, title, `url`, imageUrl) 
VALUES ('${ass_ssn}', '${datetime.NOW()}', '${content}', '${title}', '${url}', '${imageUrl}');

-- Trả về danh sách khách hàng được lọc (đã thực hiện ở trên)
-- Gửi thông tin cho khách hàng có cssn thuộc danh sách trên
INSERT INTO RECEIVES (ass_ssn,`time`,cssn) VALUES ('${ass_ssn}','${datetime.NOW()}','${cssn}');

-- ============= 1. Quản lý xem ưu đãi đang được áp dụng, đã quá hạn hoặc dự kiến áp dụng
-- Quản lý chi nhánh tìm kiếm ưu đãi bằng mã ưu đãi
SELECT *
FROM FAVOUR
WHERE ID='${favourID}';

-- Quản lý chi nhánh quản lý các mã ưu đãi
-- typeFavour = 1 => Đã quá hạn
-- typeFavour = 2 => Đang áp dụng
-- typeFavour = 3 => Dự kiến, chưa áp dụng

delimiter //
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_FAVOUR_LIST`(IN beginIndex INT, IN numItemsPerPage INT, IN typeFavour INT)
BEGIN
	SELECT *
	FROM FAVOUR
    WHERE (endDate < NOW() AND typeFavour=1) 
		OR (isFavourApply = 1 AND typeFavour=2)
        OR (isFavourApply = 0 AND typeFavour=3)
	ORDER BY ID
    LIMIT numItemsPerPage OFFSET beginIndex;
END // 
delimiter ;

-- Áp dụng GET_FAVOUR_LIST
call GET_FAVOUR_LIST('${beginIndex}','${numItemsPerPage}', '${typeFavour}');

-- ============= 2. Quản lý tạo mới ưu đãi
-- Quản lý tạo mới ưu đãi
-- Khi quản lý tạo mới một ưu đãi, nó sẽ được thêm vào danh sách dự kiến áp dụng
INSERT INTO FAVOUR VALUES ('${favourID}', '${name}', '${content}', '${discount}', '${startDate}', '${endDate}', '${quantity}', '${mssn}');

-- Hiển thị ưu đãi
SELECT *
FROM FAVOUR;

-- ============= 3. Quản lý chỉnh sửa ưu đãi, áp dụng, hủy áp dụng và xóa ưu đãi
-- Quản lý chỉnh sửa ưu đãi
UPDATE FAVOUR
SET `name`='${name}',
	`discount`='${discount}',
	`startDate`='${startDate}',
	`endDate`='${endDate}',
	`quantity`='${quantity}',
    `content`='${content}'
WHERE ID='${favourID}';

-- Quản lý áp dụng ưu đãi
UPDATE FAVOUR
SET isFavourApply = 1
WHERE ID='${favourID}';

-- Quản lý hủy áp dụng ưu đãi
UPDATE FAVOUR
SET isFavourApply = 0
WHERE ID='${favourID}';

-- Quản lý xóa ưu đãi
DELETE FROM FAVOUR WHERE ID='${favourID}';

-- ============= 4. Quản lý xem danh sách sản phẩm
-- Tìm kiếm sản phẩm bằng từ khóa input
SELECT * FROM PRODUCT WHERE id LIKE '%${input}%' OR `name` LIKE '%${input}%' OR origin LIKE '%${input}%';

-- Trả về danh sách sản phẩm
SELECT * 
FROM PRODUCT