USE SUPERMARKET_CRM;

-- Khách hàng truy xuất thông tin cá nhân dựa trên SSN của khách hàng đó --
SELECT * FROM CUSTOMER WHERE SSN = '${CustomerSSN}';
-- Khách hàng cập nhật thông tin cá nhân --
UPDATE CUSTOMER
SET fName = '${fName}',
    lName = '${lName}',
    phone = '${phone}',
    email = '${email}',
    birthday = '${birthday}',
    score = '${score}',
    favourite = '${favourite}'
WHERE SSN = '${CustomerSSN}';

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
            score, price, numberOfProducts
        FROM (
            PURCHASE JOIN TRANSACTS 
                ON PURCHASE.ID = TRANSACTS.purchaseID 
            JOIN PRODUCT 
                ON TRANSACTS.productID = PRODUCT.ID)
        WHERE PURCHASE.cssn = cssn
        ORDER BY `time` DESC
        LIMIT numItemsPerPage OFFSET beginIndex;
    END //
delimiter ;

-- Khách hàng gửi feedback
INSERT INTO FEEDBACK
VALUES ('${CustomerSSN}', '${datetime}', '${title}', '${star}', '${content}');

-- Khách hàng xem kho lưu trữ các voucher/coupon cá nhân
SELECT 
    VOUCHER_COUPON.code as code,
    VOUCHER_COUPON.`type` as `type`, 
    FAVOUR.*
FROM VOUCHER_COUPON JOIN FAVOUR ON VOUCHER_COUPON.favourID = FAVOUR.ID 
WHERE VOUCHER_COUPON.code IN (
    SELECT OWNS.vcode FROM OWNS
    WHERE OWNS.cssn = '5'
) AND VOUCHER_COUPON.isUsed = 'n';

-- Khách hàng nhận thông báo từ nhân viên chăm sóc sau bán (paging)
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

-- ================== Thống kê biểu đồ tròn về loại sản phẩm mua nhiều nhất ================== --
SELECT COUNT(*) as `buyTimes` 
FROM TRANSACTS JOIN PRODUCT ON TRANSACTS.productID = PRODUCT.ID
WHERE purchaseID IN (
    SELECT ID FROM PURCHASE
    WHERE PURCHASE.cssn = '${CustomerSSN}'
) GROUP BY PRODUCT.categoryName
ORDER BY `buyTimes`
LIMIT 5;

-- ================== Thống kê biểu đồ đường về số lần mua hàng ================== --
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

-- ================== Thống kê biểu đồ cột về điểm tích luỹ mua hàng ================== --
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

