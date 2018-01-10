--创建数据表material
CREATE TABLE IF NOT EXISTS `material`(
   `code` VARCHAR(100) NOT NULL,
   `name` VARCHAR(100) NOT NULL,
   `classify` VARCHAR(20) NOT NULL,
   `supplier` VARCHAR(30) NOT NULL,
   `spn` VARCHAR(20) NOT NULL,
   `updataTime` DATETIME,
   PRIMARY KEY ( `code` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


--插入数据
insert into material values("99","99","99","99","99",now());

--删除某一条符合条件的数据
DELETE FROM material WHERE code=77;


ALTER TABLE MyTable MODIFY COLUMN foo VARCHAR(32) NOT NULL AFTER baz;

ALTER TABLE material2 change column updataTime sysdate();



ALTER TABLE material MODIFY column updataTime DATETIME;


insert into material values("99","99","99","99","99",now());

insert into material values("11","11","11","11","11",now());


--stock create--
CREATE TABLE IF NOT EXISTS `stock`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `code` VARCHAR(100) NOT NULL,
   `name` VARCHAR(100) NOT NULL,
   `classify` VARCHAR(20),
   `supplier` VARCHAR(30),
   `spn` VARCHAR(20),
   `count` int(40) NOT NULL,
   `remarks` VARCHAR(40),
    `updataTime` DATETIME,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

    `code`  `name` `classify`  `supplier`   `spn`   `sign`   `count`   `remarks`    `updataTime` date,

insert into stock (code,name,classify,supplier,spn,sign,count,remarks,updataTime) values("11","11","11","99","99","+","300","冲销","2015-10-20 15:20:30");
insert into stock (code,name,classify,supplier,spn,sign,count,remarks,updataTime) values("11","11","11","99","99","-","300","冲销","2015-10-20 15:20:30");

SELECT num,count(*) AS counts from test_a GROUP BY num;
alter table 表名 drop column 列名;
alter table stock drop column sign;
select code,count(*) as count from stock group by code;
select code,name,classify,supplier,spn, sum(count) as 'count' from stock as count group by code; 

insert into stock (code,name,classify,supplier,spn,count,remarks,updataTime) values ("22", "22", "22", "22", "22", "-22", "22", "2017-12-23 13:36:33");


STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION