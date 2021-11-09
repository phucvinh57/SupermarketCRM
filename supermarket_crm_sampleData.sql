-- ===================== SUPERMARKET BRANCH ===================== --
INSERT INTO SUPERMARKET_BRANCH (hotline, `address`, `name`) VALUES 
('0373359726', '4D, Trần Thị Vững, p.An Bình, Dĩ An, Bình Dương', 'Chi nhánh Bình Dương'),
('0383553052', '268 Lý Thường Kiệt, phường 14, Quận 10, Tp.HCM', 'Chi nhánh Q10'),
('0383507284', 'Khu Đại học Quốc Gia Tp.HCM, Dĩ An, Bình Dương', 'Chi nhánh Bình Dương');

-- ===================== EMPLOYEE ===================== --
INSERT INTO EMPLOYEE VALUES
(NULL, '233309782', '0373395726', 'Nguyễn Phúc Vinh', '4D, Trần Thị Vững, p.An Bình, Dĩ An, Bình Dương', 
'2001-07-05', 'vinh.nguyen05072001@hcmut.edu.vn');

INSERT INTO EMPLOYEE (identityCard, phone, `name`) VALUES
('987654321', '0357896145', 'Vuơng Thanh Duyên'),
('987654321', '0357896145', 'Lê Nghĩa'),
('147852369', '0147852369', 'Nguyễn Văn A'),
('321456987', '0147852369', 'Bùi Văn B');

INSERT INTO ATPLACE_CARING_STAFF
VALUES (8), -- Vương Thanh Duyên
(6); -- Nguyễn Văn A

INSERT INTO MANAGER
VALUES (1, 3); -- Nguyễn Phúc Vinh

INSERT INTO AFTER_SELLING_STAFF
VALUES (5), -- Lê Nghĩa
(7); -- Bùi Văn B

UPDATE EMPLOYEE
SET SBranchID = 1, startWorkingDate = '2021-09-17';

-- ===================== CATEGORY ===================== --
INSERT INTO CATEGORY VALUES
('Thực phẩm đông lạnh', 'Sử dụng trong vòng 30 ngày'),
('Đồ gia dụng', 'Vật dụng sử dụng trong gia đình'),
('Đồ điện tử', 'Máy tính, TV, các thiết bị / linh kiện điện tử ...'),
('Gia vị', 'Gồm dầu ăn, nước mắm, nước tương, muối, mì chính ...'),
('Thực phẩm khô', 'Gạo, bột mì, mì gói, lương khô ...');

-- ===================== PRODUCT ===================== --
INSERT INTO PRODUCT VALUES
(NULL, 'Thịt bò đông lạnh 1kg', '2021-11-08', '2021-11-30', 200000, 'Thịt bò Úc nhập khẩu', 20, NULL, 'Thực phẩm đông lạnh'),
(NULL, 'Thớt', NULL, NULL, 40000, 'Việt Nam', 10, '10%', 'Đồ gia dụng'),
(NULL, 'TV Samsung 4K 85 inch', '2020-11-11', NULL, 12999000, 'Hàn Quốc', 100, '500000', 'Đồ điện tử'),
(NULL, 'Muối bột canh tôm', '2020-09-11', NULL, 5000, 'Hàn Quốc', 5, NULL, 'Gia vị'),
(NULL, 'Gạo 5kg', '2020-08-11', NULL, 80000, 'Hàn Quốc', 10, NULL, 'Thực phẩm khô');

-- ===================== FAVOUR ===================== --
INSERT INTO FAVOUR VALUES
(NULL, 'Giảm giá 20/11', 'Giảm giá hàng năm nhân ngày lễ 20/11', '2021-11-20', '2021-11-24', 1),
(NULL, 'Giamr giá lễ Noel', NULL, '2021-12-25', '2021-12-27', 1);

-- ===================== VOUCHER_COUPON ===================== --
INSERT INTO VOUCHER_COUPON VALUES
(NULL, 'voucher', 'y', 3),
(NULL, 'voucher', 'n', 3),
(NULL, 'coupon', 'n', 3),
(NULL, 'coupon', 'y', 3);

-- ===================== CUSTOMER ===================== --
INSERT INTO CUSTOMER VALUES
(NULL, 'Jordan', 'Peterson', '0123456789', 'jd.peterson@gmail.com', NULL, 5800, 'Book, gym facilities'),
(NULL, 'Nhi', 'Vũ Tuệ', '0321654789', 'tue.nhivu@gmail.com', '1996-11-13', 3200, 'Thực phẩm sạch'),
(NULL, 'Đăng', 'Nguyễn Hải', '0159874263', 'dang.nguyen@gmail.com', '2001-07-05', 1250, 'Đồ điện tử'),
(NULL, 'Long', 'Nguyễn Hoàng', '0963258741', 'hoanglong@gmail.com', '1993-10-13', 4875, 'Laptop Lenovo Thinkpad');

-- ===================== PURCHASE ===================== --
INSERT INTO PURCHASE VALUES
(NULL, DATE("2017-06-15 09:34:21"), 5),
(NULL, DATE("2017-06-16 09:34:21"), 6),
(NULL, DATE("2017-06-17 09:34:21"), 7),
(NULL, DATE("2017-06-18 09:34:21"), 8),
(NULL, DATE("2017-06-19 09:34:21"), 5),
(NULL, DATE("2017-06-20 09:34:21"), 6),
(NULL, DATE("2017-06-21 09:34:21"), 7);

-- ===================== FEEDBACK ===================== --
INSERT INTO FEEDBACK VALUES
(5, NOW(), 3, 'Phản hồi đơn hàng #8', 'Nhân viên thiếu nhiệt tình'),
(6, NOW(), 4, 'Phản hồi đơn hàng #9', 'Nhân viên tư vấn đúng ý khách hàng'),
(7, NOW(), 5, 'Phản hồi đơn hàng #10', 'Giá cả phải chăng, chất lượng sản phẩm tốt'),
(8, NOW(), 1, 'Phản hồi đơn hàng #11', 'Sàn nhà trơn, đi té dập mặt, phải mua thêm băng cá nhân'),
(5, NOW(), 4, 'Chất lượng sản phẩm', 'Iphone chất lượng cao, bền như Nokia, rơi xuống sàn mà sàn bể còn màn hình không sao');

-- ===================== RESOLVES ===================== --
INSERT INTO RESOLVES VALUES
(5, 5, '2021-11-08 21:45:01', NOW(), 'Xin lỗi quý khách vì điều này. Chúng tôi sẽ cải thiện thái độ đối với khách hàng'),
(7, 6, '2021-11-08 21:45:01', NOW(), 'Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi'),
(5, 7, '2021-11-08 21:45:01', NOW(), 'Cảm ơn quý khách đã tin tưởng chất lượng sản phẩm của chúng tôi'),
(7, 8, '2021-11-08 21:45:01', NOW(), 'Thành thật xin lỗi quý khách vì đã xảy ra sự cố ngoài ý muốn này'),
(5, 5, '2021-11-08 21:46:55', NOW(), 'Cảm ơn quý khách đã tin tưởng chất lượng sản phẩm của chúng tôi');

-- ===================== APPLY_FOR_PURCHASE ===================== --
INSERT INTO APPLY_FOR_PURCHASE VALUES
(1, 10),
(2, 11),
(2, 12),
(3, 13),
(3, 14);

-- ===================== APPLY_FOR_PURCHASE ===================== --
INSERT INTO TRANSACTS VALUES
(2, 8, 1, 1),
(1, 8, 1, 2),
(3, 10, 1, 1),
(4, 8, 1, 2),
(2, 9, 1, 1),
(5, 9, 1, 2),
(5, 11, 1, 2),
(5, 12, 1, 2),
(4, 13, 1, 2),
(5, 14, 1, 2);

-- ===================== NOTICES ===================== --
INSERT INTO NOTICES VALUES
(5, NOW(), 'Xin chúc mừng bạn đã trở thành khách hàng may mắn đặc biệt của chúng tôi\n
Bạn được giảm giá đặc biệt 90% cho lần mua hàng có giá trị dưới 1 triệu đồng', 'Giảm giá đặc biệt 90%'),
(7, NOW() + 1, 'Xin chúc mừng! Bạn đã trở thành khách hàng BẠC !', 'Thăng bậc khách hàng'),
(7, NOW() + 2, 'Xin chúc mừng! Bạn đã trở thành khách hàng VÀNG !', 'Thăng bậc khách hàng'),
(5, NOW() + 3, 'Sắp tới sự kiện chào mừng ngày nhà giáo 20/11, săn sale thôi nào ! Hàng ngàn ưu đãi hấp dẫn v.v', 'Sự kiện 20/11');

-- ===================== RECEIVES ===================== --
INSERT INTO RECEIVES VALUES
(5, '2021-11-09 15:26:02', 5),
(5, '2021-11-09 15:26:02', 6),
(5, '2021-11-09 15:26:02', 7),
(5, '2021-11-09 15:26:02', 8),
(7, '2021-11-09 15:26:03', 6),
(7, '2021-11-09 15:26:03', 7),
(7, '2021-11-09 15:26:04', 7),
(7, '2021-11-09 15:26:04', 5),
(5, '2021-11-09 15:26:05', 7),
(5, '2021-11-09 15:26:05', 8);

-- ===================== OWNS ===================== --
INSERT INTO OWNS VALUES
(1, 5),
(3, 5),
(2, 6),
(4, 7);

-- ===================== DEGREE ===================== --
INSERT INTO DEGREE VALUES
(1, 'Bachelor Degree of Computer Science in Ho Chi Minh University of Technology'),
(1, 'Master Degree of Computer Science in Ho Chi Minh University of Technology');