<?php
$user="root";
$password="";
$database="tutorial";
mysql_connect("127.0.0.1",$user,$password);
@mysql_select_db($database) or die( "Unable to select database");
$query="CREATE TABLE contacts (
	id int(6) NOT NULL auto_increment,
	first varchar(15) NOT NULL,
	last varchar(15) NOT NULL,
	phone varchar(20) NOT NULL,
	mobile varchar(20) NOT NULL,
	fax varchar(20) NOT NULL,
	email varchar(30) NOT NULL,
	web varchar(30) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE id (id),
	KEY id_2 (id))";
mysql_query($query);
mysql_close();
?>