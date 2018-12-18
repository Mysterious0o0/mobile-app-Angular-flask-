create database selldb charset=utf8;
	use selldb;
	create table menu(
		menuid varchar(64) primary key not null, 
		menuname varchar(64),
		url varchar(128) ,
		menuintr varchar(128),
		delflag varchar(2),
		createtime datetime);

	create table user(
		userid varchar(64) primary key not null,
		username varchar(64),
		realname varchar(64),
		mobile varchar(32),
		password_hash varchar(128),
		level varchar(2),
		score varchar(10),
		role varchar(2),
		email varchar(128),
		blackflag varchar(2),
		delflag varchar(2),
		createtime datetime);

	create table forgetpwd(
		forgetpassid varchar(64) primary key not null,
		email varchar(128),
		isdone varchar(2),
		createtime datetime);

	create table seller(
		sellerid varchar(64) primary key not null,
		sellername varchar(64),
		relatetionperson varchar(32),
		selleraddress varchar(128),
		sellerphone varchar(32),
		cardid varchar(64),
		deliverername varchar(32),
		delivererphone varchar(32),
		deliverercard varchar(64),
		delflag varchar(2),
		createtime datetime);

	create table goods(
		goodsid varchar(64) primary key not null,
		menuid varchar(64),
		sellerid varchar(64),
		goodsname varchar(64),
		count int,
		price decimal(10, 2),
		spic varchar(64),
		bpic varchar(64),
		unit varchar(32),
		online varchar(2),
		isshow varchar(2),
		selpoint varchar(128),
		delflag varchar(2),
		createtime datetime,
		updatetime datetime);

	create table itemcar(
		sorderid varchar(64) primary key not null,
		userid varchar(64),
		goodsid varchar(64)，
		goodsname varchar(64),
		count int,
		price decimal(10, 2),
		unit varchar(32),
		sumunit decimal(12, 2),
		createtime datetime);

	create table userorder(
		orderid varchar(64) primary key not null,
		addressid varchar(64),
		userid varchar(64),
		sumtotal decimal(12, 2),
		createtime datetime);

	create table sorder(
		sorderid varchar(64) primary key not null,
		orderid varchar(64),
		addressid varchar(64),
		sellerid varchar(64),
		userid varchar(64),
		goodsname varchar(64),
		price decimal(10, 2),
		count int,
		unit varchar(32),
		sumunit decimal(12, 2),
		state varchar(4),
		createtime datetime);

	create table exorder(
		sorderid varchar(64) primary key not null,
		orderid varchar(64),
		sellerid varchar(64),
		userid varchar(64),
		exdesc varchar(64),
		exrepl varchar(128),
		createtime datetime,
		repltime datetime);

	create table hisorder(
		orderid varchar(64) primary key not null,
		addressid varchar(64),
		userid varchar(64),
		sumtotal decimal(12, 2),
		createtime datetime);

	create table hissorder(
		sorderid varchar(64) primary key not null,
		orderid varchar(64),
		addressid varchar(64),
		sellerid varchar(64),
		userid varchar(64),
		goodsname varchar(64),
		price decimal(10, 2),
		count int,
		unit varchar(32),
		sumunit decimal(12, 2),
		state varchar(4),
		createtime datetime);









		