-- ===================== SUPERMARKET BRANCH ===================== --
INSERT INTO SUPERMARKET_BRANCH (ID, hotline, `address`, `name`) VALUES 
(1, '0373359726', '4D, Trần Thị Vững, p.An Bình, Dĩ An, Bình Dương', 'Chi nhánh Bình Dương'),
(2, '0383553052', '268 Lý Thường Kiệt, phường 14, Quận 10, Tp.HCM', 'Chi nhánh Q10'),
(3, '0383507284', 'Khu Đại học Quốc Gia Tp.HCM, Dĩ An, Bình Dương', 'Chi nhánh Bình Dương');

-- ===================== EMPLOYEE ===================== --
INSERT INTO EMPLOYEE VALUES
('111222333', '233309782', '0373395726', 'Nguyễn Phúc Vinh', '4D, Trần Thị Vững, p.An Bình, Dĩ An, Bình Dương', 
'2001-07-05', 'vinh.nguyen05072001@hcmut.edu.vn', 1, '2021-09-17');

INSERT INTO EMPLOYEE (ssn, identityCard, phone, `name`, sBranchID, startWorkingDate) VALUES
('222333444', '987654321', '0357896145', 'Vương Thanh Duyên', 1, '2021-09-17'),
('333444555', '987654323', '0357896124', 'Lê Nghĩa', 1, '2021-09-17'),
('444555666', '147852369', '0357896134', 'Nguyễn Văn A', 2, '2021-09-17'),
('555666777', '147852456', '0357892345', 'Bùi Văn B', 2, '2021-09-17');

INSERT INTO MANAGER
VALUES ('111222333', 3); 

INSERT INTO AFTER_SELLING_STAFF
VALUES ('222333444'),
('333444555'),
('444555666'),
('555666777'); 

-- ===================== CATEGORY ===================== --
INSERT INTO CATEGORY VALUES
('Thực phẩm đông lạnh', 'Sử dụng trong vòng 30 ngày'),
('Đồ gia dụng', 'Vật dụng sử dụng trong gia đình'),
('Đồ điện tử', 'Máy tính, TV, các thiết bị / linh kiện điện tử ...'),
('Gia vị', 'Gồm dầu ăn, nước mắm, nước tương, muối, mì chính ...'),
('Thực phẩm khô', 'Gạo, bột mì, mì gói, lương khô ...');

-- ===================== PRODUCT ===================== --
INSERT INTO PRODUCT VALUES
(1, 'Thịt bò đông lạnh 1kg', '2021-11-08', '2021-11-30', 200000, 'Thịt bò Úc nhập khẩu', 20, NULL, 'Thực phẩm đông lạnh'),
(2, 'Thớt', NULL, NULL, 40000, 'Việt Nam', 10, '10%', 'Đồ gia dụng'),
(3, 'TV Samsung 4K 85 inch', '2020-11-11', NULL, 12999000, 'Hàn Quốc', 100, '500000', 'Đồ điện tử'),
(4, 'Muối bột canh tôm', '2020-09-11', NULL, 5000, 'Hàn Quốc', 5, NULL, 'Gia vị'),
(5, 'Gạo 5kg', '2020-08-11', NULL, 80000, 'Hàn Quốc', 10, NULL, 'Thực phẩm khô');

-- ===================== FAVOUR ===================== --
INSERT INTO FAVOUR VALUES
(1, 'Giảm giá 20/11', 'Giảm giá hàng năm nhân ngày lễ 20/11', '2021-11-20', '2021-11-24',100, 1, '111222333'),
(2, 'Giảm giá lễ Noel','Giảm giá lễ Noel', '2021-12-25', '2021-12-27',100, 1, '111222333'),
(3, 'Săn sale', 'Săn sale 11/11/2021', '2021-11-10', '2021-11-12', 100, 1, '111222333');

-- ===================== VOUCHER_COUPON ===================== --
INSERT INTO VOUCHER_COUPON VALUES
(1, 'voucher', 'y', 1),
(2, 'voucher', 'n', 1),
(3, 'coupon', 'n', 2),
(4, 'coupon', 'y', 2);

-- ===================== CUSTOMER ===================== --
INSERT INTO CUSTOMER VALUES
('111122223', 'Jordan', 'Peterson', '0123456789', 'jd.peterson@gmail.com', NULL, 5800, 'Book, gym facilities', 'imageUrl'),
('222233334', 'Nhi', 'Vũ Tuệ', '0321654789', 'tue.nhivu@gmail.com', '1996-11-13', 3200, 'Thực phẩm sạch', 'imageUrl'),
('333344445', 'Đăng', 'Nguyễn Hải', '0159874263', 'dang.nguyen@gmail.com', '2001-07-05', 1250, 'Đồ điện tử', 'imageUrl'),
('444455556', 'Long', 'Nguyễn Hoàng', '0963258741', 'hoanglong@gmail.com', '1993-10-13', 4875, 'Laptop Lenovo Thinkpad', 'imageUrl');

-- ===================== PURCHASE ===================== --
INSERT INTO PURCHASE VALUES
(1, DATE("2021-10-11 12:00:00"), '111122223'),
(2, DATE("2021-10-11 12:00:00"), '111122223'),
(3, DATE("2021-10-11 13:00:00"), '222233334'),
(4, DATE("2021-10-11 13:00:00"), '222233334'),
(5, DATE("2021-10-11 13:00:00"), '222233334'),
(6, DATE("2021-10-11 14:00:00"), '333344445'),
(7, DATE("2021-10-11 14:00:00"), '333344445');

-- ===================== FEEDBACK ===================== --
INSERT INTO FEEDBACK VALUES
('111122223', '2021-10-12 12:00:00', 3, 'Phản hồi đơn hàng #1', 'Nhân viên thiếu nhiệt tình'),
('111122223', '2021-10-13 16:03:01', 4, 'Phản hồi đơn hàng #2', 'Nhân viên tư vấn đúng ý khách hàng'),
('222233334', '2021-10-14 17:04:02', 5, 'Phản hồi đơn hàng #3', 'Giá cả phải chăng, chất lượng sản phẩm tốt'),
('222233334', '2021-10-15 18:05:03', 1, 'Phản hồi đơn hàng #4', 'Sàn nhà trơn, đi té dập mặt, phải mua thêm băng cá nhân'),
('333344445', '2021-10-16 19:06:04', 4, 'Chất lượng sản phẩm', 'Iphone chất lượng cao, bền như Nokia, rơi xuống sàn mà sàn bể còn màn hình không sao');

-- ===================== RESOLVES ===================== --
INSERT INTO RESOLVES VALUES
('222333444', '111122223', '2021-10-12 12:00:00', '2021-10-12 13:00:00', 'Xin lỗi quý khách vì điều này. Chúng tôi sẽ cải thiện thái độ đối với khách hàng'),
('222333444', '111122223', '2021-10-13 16:03:01', '2021-10-13 17:00:01', 'Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi'),
('222333444', '222233334', '2021-10-14 17:04:02', '2021-10-14 18:04:02', 'Cảm ơn quý khách đã tin tưởng chất lượng sản phẩm của chúng tôi'),
('333444555', '222233334', '2021-10-15 18:05:03', '2021-10-15 19:05:03', 'Thành thật xin lỗi quý khách vì đã xảy ra sự cố ngoài ý muốn này'),
('333444555', '333344445', '2021-10-16 19:06:04', '2021-10-16 19:36:04', 'Cảm ơn quý khách đã tin tưởng chất lượng sản phẩm của chúng tôi');

-- ===================== APPLY_FOR_PURCHASE ===================== --
INSERT INTO APPLY_FOR_PURCHASE VALUES
(1, 3, '10%'),
(2, 4, '5000'),
(2, 5, '10000'),
(3, 6, '1000'),
(3, 7, '10%');

-- ===================== APPLY_FOR_PURCHASE ===================== --
INSERT INTO TRANSACTS (productID, purchaseID, SBranchID, numberOfProducts, price, score, discount) VALUES
(2, 1, 1, 1, 100000, 100, '10000'),
(1, 1, 1, 2, 200000, 200, '5%'),
(3, 3, 1, 1, 200000, 200, '10000'),
(4, 1, 1, 2, 100000, 100, '10000'),
(2, 2, 1, 1, 3000000, 500, '10%'),
(5, 2, 1, 2, 100000, 100, '10000'),
(5, 4, 1, 2, 400000, 400, '5%'),
(5, 5, 1, 2, 100000, 100, '10000'),
(4, 6, 1, 2, 500000, 500, '5%'),
(5, 7, 1, 2, 100000, 100, '10000');

-- ===================== NOTICES ===================== --
INSERT INTO NOTICES (ass_ssn, `time`, content, title) VALUES
('333444555', '2021-11-09 15:26:02', 'Xin chúc mừng bạn đã trở thành khách hàng may mắn đặc biệt của chúng tôi\n
Bạn được giảm giá đặc biệt 90% cho lần mua hàng có giá trị dưới 1 triệu đồng', 'Giảm giá đặc biệt 90%'),
('555666777', '2021-11-09 15:26:03', 'Xin chúc mừng! Bạn đã trở thành khách hàng BẠC !', 'Thăng bậc khách hàng'),
('555666777', '2021-11-09 15:26:04', 'Xin chúc mừng! Bạn đã trở thành khách hàng VÀNG !', 'Thăng bậc khách hàng'),
('333444555', '2021-11-09 15:26:05', 'Sắp tới sự kiện chào mừng ngày nhà giáo 20/11, săn sale thôi nào ! Hàng ngàn ưu đãi hấp dẫn v.v', 'Sự kiện 20/11');

-- ===================== RECEIVES ===================== --
INSERT INTO RECEIVES VALUES
(333444555, '2021-11-09 15:26:02', 111122223),
(333444555, '2021-11-09 15:26:02', 222233334),
(333444555, '2021-11-09 15:26:02', 333344445),
(333444555, '2021-11-09 15:26:02', 444455556),
(555666777, '2021-11-09 15:26:03', 222233334),
(555666777, '2021-11-09 15:26:03', 333344445),
(555666777, '2021-11-09 15:26:04', 333344445),
(555666777, '2021-11-09 15:26:04', 111122223),
(333444555, '2021-11-09 15:26:05', 333344445),
(333444555, '2021-11-09 15:26:05', 444455556);

-- ===================== OWNS ===================== --
INSERT INTO OWNS VALUES
(1, '111122223'),
(2, '222233334');

-- ===================== DEGREE ===================== --
INSERT INTO DEGREE VALUES
('111222333', 'Bachelor Degree of Computer Science in Ho Chi Minh University of Technology'),
('111222333', 'Master Degree of Computer Science in Ho Chi Minh University of Technology');