DROP TRIGGER IF EXISTS NEW_PURCHASE;
delimiter //
CREATE TRIGGER NEW_PURCHASE AFTER INSERT ON PURCHASE
FOR EACH ROW
    BEGIN
        SET @cnt = (SELECT COUNT(*) FROM TRANSACTS WHERE purchaseID = NEW.ID);
        IF @cnt = 0 THEN 
            SET @msg = 'A PURCHASE MUST PARTICIPATE IN AT LEAST 1 TRANSACT';
            SIGNAL SQLSTATE '45000' SET message_text = @msg;
        END IF;
    END //
delimiter ;

DROP TRIGGER IF EXISTS NEW_NOTICE;
delimiter //
CREATE TRIGGER NEW_NOTICE AFTER INSERT ON NOTICES
FOR EACH ROW
    BEGIN
        SET @cnt = (SELECT COUNT(*) FROM RECEIVES WHERE ass_ssn = NEW.ass_ssn AND `time` = NEW.`time`);
        IF @cnt = 0 THEN 
            SET @msg = 'A NOTIFICATION MUST HAS SPECIFIC TARGET';
            SIGNAL SQLSTATE '45000' SET message_text = @msg;
        END IF;
    END //
delimiter ;