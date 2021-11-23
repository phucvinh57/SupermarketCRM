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
            SUPERMARKET_BRANCH.`name` as branchName, SUPERMARKET_BRANCH.`address` as branchAddr, SUPERMARKET_BRANCH.hotline as branchHotline,
            totalScore, totalPrice
        FROM (
            PURCHASE JOIN TRANSACTS 
                ON PURCHASE.ID = TRANSACTS.purchaseID 
            JOIN PRODUCT 
                ON TRANSACTS.productID = PRODUCT.ID)
        WHERE PURCHASE.cssn = cssn
        ORDER BY `time` DESC
        GROUP BY PURCHASE.ID
        LIMIT numItemsPerPage OFFSET beginIndex;
    END //
delimiter ;

-- ======= 4. Kho lưu trữ ưu đãi cá nhân của khách hàng
-- Hiển thị danh sách 
SELECT 
    VOUCHER_COUPON.code as code, 
    VOUCHER_COUPON.`type` as `type`, 
    FAVOUR.*
FROM VOUCHER_COUPON JOIN FAVOUR ON VOUCHER_COUPON.favourID = FAVOUR.ID 
WHERE VOUCHER_COUPON.code IN (
    SELECT OWNS.vcode FROM OWNS
    WHERE OWNS.cssn = '${CustomerSSN}'
) AND VOUCHER_COUPON.isUsed = 'n' 
AND FAVOUR.`status` = 'applying';

-- Xóa ưu đãi kho sở hữu cá nhân
DELETE FROM OWNS WHERE vcode='${vcode}';

-- ======= 5. Khách hàng xem trang thông báo
-- Sử dụng paging để xử lý lượng dữ liệu lớn
DROP PROCEDURE IF EXISTS GET_NOTIFICATION_LIST;
delimiter //
CREATE PROCEDURE GET_NOTIFICATION_LIST(IN cssn INT, IN beginIndex INT, IN numItemsPerPage INT)
    BEGIN
        SELECT `time`, title, content
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
-- Loại khách hàng được ứng dụng thực hiện tính toán từ điểm tích lũy của khách hàng. 
-- Trả về thông tin khách hàng dựa vào input
SELECT * FROM CUSTOMER WHERE ssn = '${input}' OR phone = '${input}' or email = '${input}';

-- ======= 2. Nhân viên xem thông tin thống kê khách hàng

-- Thống kê biểu đồ tròn về loại sản phẩm mua nhiều nhất  --
SELECT COUNT(*) as `buyTimes` 
FROM TRANSACTS JOIN PRODUCT ON TRANSACTS.productID = PRODUCT.ID
WHERE purchaseID IN (
    SELECT ID FROM PURCHASE
    WHERE PURCHASE.cssn = '${CustomerSSN}'
) GROUP BY PRODUCT.categoryName
ORDER BY `buyTimes`
LIMIT 5;

--  Thống kê biểu đồ đường về số lần mua hàng  --
-- Theo tuần
SELECT 
    COUNT(*) as 'buyTimes', 
    CONCAT(YEAR(`time`), '/', WEEK(`time`)) as `week`
FROM PURCHASE JOIN CUSTOMER ON PURCHASE.cssn = CUSTOMER.ssn
WHERE `time` > '${startTime}' AND `time` <'${endTime}';
GROUP BY `week`;

-- Theo tháng
SELECT 
    COUNT(*) as 'buyTimes', 
    CONCAT(YEAR(`time`), '/', MONTH(`time`)) as `month`
FROM PURCHASE JOIN CUSTOMER ON PURCHASE.cssn = CUSTOMER.ssn
WHERE `time` > '${startTime}' AND `time` <'${endTime}';
GROUP BY `month`;

-- Theo quý
SELECT 
    COUNT(*) as 'buyTimes', 
    CONCAT(YEAR(`time`), '/', MONTH(`time`) DIV 3) as `quarter`
FROM PURCHASE JOIN CUSTOMER ON PURCHASE.cssn = CUSTOMER.ssn
WHERE `time` > '${startTime}' AND `time` <'${endTime}';
GROUP BY `quarter`;

-- Theo năm
SELECT 
    COUNT(*) as 'buyTimes', YEAR(`time`) as `year`
FROM PURCHASE JOIN CUSTOMER ON PURCHASE.cssn = CUSTOMER.ssn
WHERE `time` > '${startTime}' AND `time` <'${endTime}';
GROUP BY `year`;

--  Thống kê biểu đồ cột về điểm tích luỹ mua hàng  --
-- Theo tuần
SELECT 
    SUM(totalScore) as `score`, 
    CONCAT(YEAR(`time`), '/', WEEK(`time`)) as `week`
FROM PURCHASE JOIN CUSTOMER ON PURCHASE.cssn = CUSTOMER.ssn
WHERE `time` > '${startTime}' AND `time` <'${endTime}';
GROUP BY `week`;
-- Theo tháng
SELECT 
    SUM(totalScore) as `score`, 
    CONCAT(YEAR(`time`), '/', MONTH(`time`)) as `month`
FROM PURCHASE JOIN CUSTOMER ON PURCHASE.cssn = CUSTOMER.ssn
WHERE `time` > '${startTime}' AND `time` <'${endTime}';
GROUP BY `month`;
-- Theo quý
SELECT 
    SUM(totalScore) as `score`, 
    CONCAT(YEAR(`time`), '/', MONTH(`time`) DIV 3) as `quarter`
FROM PURCHASE JOIN CUSTOMER ON PURCHASE.cssn = CUSTOMER.ssn
WHERE `time` > '${startTime}' AND `time` <'${endTime}';
GROUP BY `quarter`;
-- Theo năm
SELECT 
    SUM(totalScore) as `score`, 
    YEAR(`time`) as `year`
FROM PURCHASE JOIN CUSTOMER ON PURCHASE.cssn = CUSTOMER.ssn
WHERE `time` > '${startTime}' AND `time` <'${endTime}';
GROUP BY `year`;

-- ========= 3. Nhân viên xem danh sách khách hàng
-- Tìm kiếm khách hàng bằng keyword: input
SELECT * FROM CUSTOMER WHERE phone LIKE '%${input}%' OR email LIKE '%${input}%';

-- Trả về danh sách khách hàng 
delimiter //
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_CUSTOMER_LIST`(IN beginIndex INT, IN numItemsPerPage INT, IN typeCustomer INT)
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

SELECT fname,lname,`time`,stars,title,content
FROM FEEDBACK, CUSTOMER
WHERE FEEDBACK.cssn = CUSTOMER.ssn AND (phone LIKE '%${input}%' OR email LIKE '%${input}%') 
ORDER BY `time` DESC; 

-- Trả về danh sách phản hồi của khách hàng
SELECT fname,lname,`time`,stars,title,content
FROM FEEDBACK, CUSTOMER
WHERE FEEDBACK.cssn = CUSTOMER.ssn
ORDER BY `time` DESC; 

-- Nhân viên phản hồi đánh giá của khách hàng
INSERT INTO RESOLVES (ass_ssn,cssn,feedbackTime,resolveTime,content) 
VALUES ('${ass_ssn}','${cssn}','${feedbackTime}','${datetime.NOW()}','${content}'); 

-- ============= 5. Nhân viên gửi thông báo cho khách hàng
-- Nhân viên tạo thông báo
INSERT INTO NOTICES (ass_ssn,`time`,content,title) VALUES ('${ass_ssn}','${datetime.NOW()}','${content}','${title}');
-- Trả về danh sách khách hàng được lọc (đã thực hiện ở trên)
-- Gửi thông tin cho khách hàng có cssn thuộc danh sách trên
INSERT INTO RECEIVES (ass_ssn,`time`,cssn) VALUES ('${ass_ssn}','${datetime.NOW()}','${cssn}')
-- ============= 1. Quản lý xem ưu đãi đang được áp dụng, đã quá hạn hoặc dự kiến áp dụng
-- Quản lý chi nhánh tìm kiếm ưu đãi bằng mã ưu đãi
SELECT *
FROM FAVOUR
WHERE ID='${favourID}';

-- Quản lý chi nhánh quản lý các mã ưu đãi
-- statusValue = 1 => Đang áp dụng
-- statusValue = 2 => Dự kiến
-- statusValue = 3 => Quá hạn

delimiter //
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_FAVOUR_LIST`(IN beginIndex INT, IN numItemsPerPage INT, statusValue INT)
BEGIN
	SELECT *
	FROM FAVOUR
    WHERE (`status`=statusValue)
	ORDER BY ID
    LIMIT numItemsPerPage OFFSET beginIndex;
END // 
delimiter ;

-- Áp dụng GET_FAVOUR_LIST
call GET_FAVOUR_LIST('${beginIndex}','${numItemsPerPage}','${statusValue}');

-- ============= 2. Quản lý tạo mới ưu đãi
-- Quản lý tạo mới ưu đãi
-- Khi quản lý tạo mới một ưu đãi, nó sẽ được thêm vào danh sách dự kiến áp dụng
INSERT INTO FAVOUR VALUES (NULL, '${name}', '${content}','${startDate}', '${endDate}', '${quantity}', '${discount}','${status}', '${mssn}');

-- Hiển thị ưu đãi
SELECT *
FROM FAVOUR
WHERE ID='${favourID}';

-- ============= 3. Quản lý chỉnh sửa ưu đãi và xóa ưu đãi
-- Quản lý chỉnh sửa ưu đãi
UPDATE FAVOUR
SET `name`='${name}',
	`status`='${status}',
	`discount`='${discount}',
	`startDate`='${startDate}',
	`endDate`='${endDate}',
	`quantity`='${quantity}',
    `content`='${content}'
WHERE ID='${favourID}';

-- Quản lý xóa ưu đãi
DELETE FROM FAVOUR WHERE ID='${favourID}';

-- ============= 4. Quản lý xem danh sách sản phẩm
-- Tìm kiếm sản phẩm bằng từ khóa input
SELECT * FROM PRODUCT WHERE id LIKE '%${input}%' OR `name` LIKE '%${input}%';

-- Trả về danh sách sản phẩm
delimiter //
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_PRODUCT_LIST`(IN beginIndex INT, IN numItemsPerPage INT)
BEGIN
	SELECT *
	FROM PRODUCT
	ORDER BY ID
    LIMIT numItemsPerPage OFFSET beginIndex;
END // 
delimiter ;
call GET_PRODUCT_LIST('${beginIndex}','${numItemsPerPage}');