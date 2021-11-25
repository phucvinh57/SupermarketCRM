-- ================== Cấp quyền cho Khách hàng ================== --
DROP USER IF EXISTS 'crm_customer'@'localhost';
CREATE USER 'crm_customer'@'localhost' IDENTIFIED BY 'phucvinh';

-- Cho phép xem, cập nhật thông tin cá nhân
GRANT SELECT, UPDATE ON SUPERMARKET_CRM.CUSTOMER TO 'crm_customer'@'localhost';

-- Cho phép xem, tạo (gửi) phản hồi
GRANT SELECT, INSERT ON SUPERMARKET_CRM.FEEDBACK TO 'crm_customer'@'localhost';

-- Cho phép xem lịch sử mua sắm và các thông tin liên quan về sản phẩm, chi nhánh thực hiện giao dịch
GRANT SELECT ON SUPERMARKET_CRM.PURCHASE TO 'crm_customer'@'localhost';
GRANT SELECT ON SUPERMARKET_CRM.TRANSACTS TO 'crm_customer'@'localhost';
GRANT SELECT ON SUPERMARKET_CRM.PRODUCT TO 'crm_customer'@'localhost';
GRANT SELECT ON SUPERMARKET_CRM.SUPERMARKET_BRANCH TO 'crm_customer'@'localhost';

-- Cho phép xem thông báo từ nhân viên
GRANT SELECT ON SUPERMARKET_CRM.NOTICES TO 'crm_customer'@'localhost';
GRANT SELECT ON SUPERMARKET_CRM.RECEIVES TO 'crm_customer'@'localhost';

-- Cho phép xem kho lưu trữ ưu đãi cá nhân và thông tin ưu đãi
GRANT SELECT ON SUPERMARKET_CRM.FAVOUR TO 'crm_customer'@'localhost';
GRANT SELECT ON SUPERMARKET_CRM.VOUCHER_COUPON TO 'crm_customer'@'localhost';
GRANT SELECT ON SUPERMARKET_CRM.OWNS TO 'crm_customer'@'localhost';

-- Cho phép xoá voucher/coupon khỏi kho lưu trữ ưu đãi cá nhân
GRANT DELETE ON SUPERMARKET_CRM.OWNS TO 'crm_customer'@'localhost';

-- ================== Cấp quyền cho Nhân viên ================== --
DROP USER IF EXISTS 'crm_staff'@'localhost';
CREATE USER 'crm_staff'@'localhost' IDENTIFIED BY 'phucvinh';

-- Xem danh sách khách hàng và thông tin khách hàng 
GRANT SELECT ON SUPERMARKET_CRM.CUSTOMER TO 'crm_staff'@'localhost';

-- Truy cập PURCHASE, TRANSACTS, PRODUCT để đưa ra thống kê cho Nhân viên về xu hướng khách hàng
GRANT SELECT ON SUPERMARKET_CRM.PURCHASE TO 'crm_staff'@'localhost';
GRANT SELECT ON SUPERMARKET_CRM.TRANSACTS TO 'crm_staff'@'localhost';
GRANT SELECT ON SUPERMARKET_CRM.PRODUCT TO 'crm_staff'@'localhost';

-- Xem feedback của khách hàng
GRANT SELECT ON SUPERMARKET_CRM.FEEDBACK TO 'crm_staff'@'localhost';

-- Trả lời phản hồi của khách hàng
GRANT SELECT, INSERT ON SUPERMARKET_CRM.RESOLVES TO 'crm_staff'@'localhost';

-- Gửi thông báo cho khách hàng
GRANT SELECT, INSERT ON SUPERMARKET_CRM.NOTICES TO 'crm_staff'@'localhost';
GRANT SELECT, INSERT ON SUPERMARKET_CRM.RECEIVES TO 'crm_staff'@'localhost';

-- ================== Cấp quyền cho Quản lý ================== --
DROP USER IF EXISTS 'crm_manager'@'localhost';
CREATE USER 'crm_manager'@'localhost' IDENTIFIED BY 'phucvinh';

-- Thêm, xoá, sửa, cập nhật ưu đãi
GRANT SELECT, INSERT, DELETE, UPDATE ON SUPERMARKET_CRM.FAVOUR TO 'crm_manager'@'localhost';
GRANT SELECT, INSERT, DELETE, UPDATE ON SUPERMARKET_CRM.VOUCHER_COUPON TO 'crm_manager'@'localhost';

-- Xem thông tin về sản phẩm
GRANT SELECT ON SUPERMARKET_CRM.PRODUCT TO 'crm_manager'@'localhost';

-- Cập nhật cài đặt
FLUSH PRIVILEGES;

ALTER USER 'crm_customer'@'localhost' IDENTIFIED WITH mysql_native_password BY 'phucvinh';
ALTER USER 'crm_staff'@'localhost' IDENTIFIED WITH mysql_native_password BY 'phucvinh';
ALTER USER 'crm_staff'@'localhost' IDENTIFIED WITH mysql_native_password BY 'phucvinh';