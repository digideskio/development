-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 13, 2013 at 06:27 PM
-- Server version: 5.5.25
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `stations`
--

-- --------------------------------------------------------

--
-- Table structure for table `voters`
--

CREATE TABLE `voters` (
  `edge` int(4) DEFAULT NULL,
  `value` int(2) DEFAULT NULL,
  `voters` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `voters`
--

INSERT INTO `voters` (`edge`, `value`, `voters`) VALUES
(589, 50, 0),
(591, 50, 0),
(593, 50, 0),
(594, 50, 0),
(595, 50, 0),
(599, 50, 0),
(601, 50, 0),
(603, 50, 0),
(605, 50, 0),
(607, 50, 0),
(609, 50, 0),
(610, 50, 0),
(612, 50, 0),
(615, 50, 0),
(616, 50, 0),
(617, 50, 0),
(618, 50, 0),
(620, 50, 0),
(621, 50, 0),
(622, 50, 0),
(625, 50, 0),
(626, 50, 0),
(630, 50, 0),
(635, 50, 0),
(637, 80, 1),
(638, 80, 1),
(640, 80, 1),
(643, 50, 0),
(645, 50, 0),
(647, 49, 1),
(649, 90, 1),
(651, 50, 0),
(653, 50, 0),
(655, 50, 0),
(656, 50, 0),
(658, 50, 0),
(661, 50, 0),
(663, 50, 0),
(665, 50, 0),
(667, 50, 0),
(669, 50, 0),
(671, 40, 1),
(673, 50, 0),
(674, 50, 0),
(676, 50, 0),
(679, 50, 0),
(681, 74, 1),
(682, 75, 1),
(684, 42, 1),
(687, 50, 0),
(689, 50, 1),
(690, 68, 1),
(692, 68, 1),
(695, 50, 0),
(697, 50, 0),
(699, 50, 0),
(701, 50, 0),
(703, 80, 1),
(704, 39, 1),
(705, 80, 1),
(707, 80, 1),
(708, 50, 1),
(711, 87, 1),
(715, 50, 0),
(716, 50, 0),
(717, 50, 0),
(719, 50, 0),
(720, 50, 0),
(723, 50, 0),
(727, 50, 0),
(729, 50, 0),
(731, 50, 0),
(732, 50, 0),
(734, 50, 0),
(737, 50, 0),
(739, 56, 1),
(741, 50, 0),
(743, 50, 0),
(745, 50, 0),
(747, 50, 0),
(749, 50, 0),
(750, 50, 0),
(752, 50, 0),
(755, 50, 0),
(757, 50, 0),
(759, 50, 0),
(761, 78, 1),
(763, 50, 0),
(764, 50, 0),
(765, 50, 0),
(766, 50, 0),
(768, 50, 0),
(769, 50, 0),
(770, 50, 0),
(773, 50, 0),
(774, 50, 0),
(778, 50, 0),
(779, 50, 0),
(781, 50, 0),
(783, 50, 0),
(784, 50, 0),
(785, 50, 0),
(787, 50, 0),
(788, 50, 0),
(791, 50, 0),
(795, 41, 1),
(797, 50, 0),
(798, 50, 0),
(800, 50, 0),
(803, 50, 0),
(804, 50, 0),
(806, 50, 0),
(809, 50, 0),
(811, 50, 0),
(1194, 100, 1),
(1195, 50, 0),
(1196, 50, 0),
(1197, 50, 0),
(1198, 50, 0),
(1199, 50, 0),
(1200, 50, 0),
(1201, 50, 0),
(1202, 50, 0),
(1203, 50, 0),
(1204, 50, 0),
(1205, 50, 0),
(1206, 50, 0),
(1207, 50, 0),
(1208, 50, 0),
(1209, 50, 0),
(1210, 50, 0),
(1211, 50, 0),
(1212, 50, 0),
(1213, 50, 0),
(1214, 50, 0),
(1215, 50, 0),
(1216, 50, 0),
(1217, 50, 0),
(1218, 50, 0),
(1219, 50, 0),
(1220, 50, 0),
(1221, 50, 0),
(1222, 50, 0),
(1223, 50, 0),
(1224, 50, 0),
(1225, 50, 0),
(1226, 50, 0),
(1227, 50, 0),
(1228, 40, 1),
(1229, 50, 0),
(1230, 50, 0),
(1231, 50, 0),
(1232, 50, 0),
(1233, 50, 0),
(1234, 50, 0),
(1235, 64, 1),
(1236, 50, 0),
(1237, 50, 0),
(1238, 50, 0),
(1239, 50, 0),
(1240, 50, 0),
(1241, 50, 0),
(1242, 50, 0),
(1243, 50, 0),
(1244, 50, 0),
(1245, 50, 0),
(1246, 50, 0),
(1247, 50, 0),
(1248, 50, 0),
(1249, 50, 0),
(1250, 50, 0),
(1251, 50, 0),
(1252, 50, 0),
(1253, 50, 0),
(1254, 50, 0),
(1255, 50, 0),
(1256, 50, 0),
(1257, 50, 0),
(1258, 50, 0),
(1259, 50, 0),
(1260, 50, 0),
(1261, 50, 0),
(1262, 50, 0),
(1263, 50, 0),
(1264, 50, 0),
(1265, 50, 0),
(1266, 50, 0),
(1267, 50, 0),
(1268, 50, 0),
(1269, 50, 0),
(1270, 50, 0),
(1271, 50, 0),
(1272, 50, 0),
(1273, 50, 0),
(1274, 50, 0),
(1275, 60, 1),
(1276, 60, 1),
(1277, 59, 1),
(1278, 50, 0),
(1279, 50, 0),
(1280, 50, 0),
(1281, 50, 0),
(1282, 50, 0),
(1283, 50, 0),
(1284, 50, 0),
(1285, 50, 0),
(1286, 50, 0),
(1287, 50, 0),
(1288, 50, 0),
(1289, 50, 0),
(1290, 50, 0),
(1291, 50, 0),
(1292, 50, 0),
(1293, 50, 0),
(1294, 50, 0),
(1295, 50, 0),
(1296, 50, 0),
(1297, 40, 1),
(1298, 46, 1),
(1299, 50, 0),
(1300, 50, 0),
(1301, 50, 0),
(1302, 50, 0),
(1303, 50, 0),
(1304, 50, 0),
(1305, 50, 0),
(1306, 50, 0),
(1307, 50, 0),
(1308, 50, 0),
(1309, 32, 1),
(1310, 50, 0),
(1311, 50, 0),
(1312, 50, 0),
(1313, 59, 1),
(1314, 60, 1),
(1315, 50, 0),
(1316, 50, 0),
(1317, 50, 0),
(1318, 50, 0),
(1319, 50, 0),
(1320, 50, 0),
(1321, 50, 0),
(1322, 50, 0),
(1323, 50, 0),
(1324, 50, 0),
(1325, 50, 0),
(1326, 50, 0),
(1327, 50, 0),
(1328, 50, 0),
(1329, 50, 0),
(1330, 50, 0),
(1331, 50, 0),
(1332, 50, 0),
(1333, 50, 0),
(1334, 50, 0),
(1335, 50, 0),
(1336, 50, 0),
(1337, 50, 0),
(1338, 50, 0),
(1339, 50, 0),
(1340, 50, 0),
(1341, 50, 0),
(1342, 71, 1),
(1343, 70, 1),
(1344, 50, 0),
(1345, 50, 0),
(1346, 50, 0),
(1347, 50, 0),
(1348, 50, 0),
(1349, 50, 0),
(1350, 50, 0),
(1351, 50, 0),
(1352, 50, 0),
(1353, 50, 0),
(1354, 50, 0),
(1355, 50, 0),
(1356, 50, 0),
(1357, 50, 0),
(1358, 50, 0),
(1359, 52, 1),
(1360, 60, 1),
(1361, 61, 1),
(1362, 50, 0),
(1363, 50, 0),
(1364, 50, 0),
(1365, 50, 0),
(1366, 50, 0),
(1367, 50, 0),
(1368, 50, 0),
(1369, 50, 0),
(1370, 50, 0),
(1371, 50, 0),
(1372, 50, 0),
(1373, 50, 0),
(1374, 50, 0),
(1375, 50, 0),
(1376, 50, 0),
(1377, 50, 0),
(1378, 50, 0),
(1379, 50, 0),
(1380, 68, 1),
(1381, 68, 1),
(1382, 82, 1),
(1383, 50, 0),
(1384, 50, 0),
(1385, 50, 0),
(1386, 50, 0),
(1387, 50, 0),
(1388, 50, 0),
(1389, 50, 0),
(1390, 50, 0),
(1391, 50, 0),
(1392, 50, 0),
(1393, 50, 0),
(1394, 50, 0),
(1395, 50, 0),
(1396, 50, 0),
(1397, 50, 0),
(1398, 50, 0),
(1399, 50, 0),
(1400, 50, 0),
(1401, 50, 0),
(1402, 50, 0),
(1403, 50, 0),
(1404, 50, 0),
(1405, 50, 0),
(1406, 50, 0),
(1407, 50, 0),
(1408, 50, 0),
(1409, 50, 0),
(1410, 50, 0),
(1411, 50, 0),
(1412, 45, 1),
(1413, 60, 1),
(1414, 50, 1),
(1415, 54, 1),
(1416, 50, 0),
(1417, 50, 0),
(1418, 50, 0),
(1419, 50, 0),
(1420, 50, 0),
(1421, 50, 0),
(1422, 50, 0),
(1423, 50, 0),
(1424, 50, 0),
(1425, 50, 0),
(1426, 50, 0),
(1427, 50, 0),
(1428, 50, 0),
(1429, 50, 0),
(1430, 50, 0),
(1431, 50, 0),
(1432, 50, 0),
(1433, 50, 0),
(1434, 50, 0),
(1435, 50, 0),
(1436, 4, 1),
(1437, 40, 1),
(1438, 51, 1),
(1439, 50, 0),
(1440, 50, 0),
(1441, 50, 0),
(1442, 50, 0),
(1443, 50, 0),
(1444, 50, 0),
(1445, 50, 0),
(1446, 50, 0),
(1447, 50, 0),
(1448, 50, 0),
(1449, 50, 0),
(1450, 50, 0),
(1451, 50, 0),
(1452, 50, 0),
(1453, 50, 0),
(1454, 50, 0),
(1455, 50, 0),
(1456, 50, 0),
(1457, 50, 0),
(1458, 50, 0),
(1459, 50, 0),
(1460, 50, 0),
(1461, 50, 0),
(1462, 50, 0),
(1463, 50, 0),
(1464, 50, 0),
(1465, 50, 0),
(1466, 50, 0),
(1467, 50, 0),
(1468, 50, 0),
(1469, 50, 0),
(1470, 50, 0),
(1471, 50, 0),
(1472, 50, 0),
(1473, 50, 0),
(1474, 50, 0),
(1475, 50, 0),
(1476, 50, 0),
(1477, 50, 0),
(1478, 50, 0),
(1479, 50, 0),
(1480, 50, 0),
(1481, 50, 0),
(1482, 50, 0),
(1483, 50, 0),
(1484, 50, 0),
(1485, 50, 0),
(1486, 50, 0),
(1487, 95, 1),
(1488, 50, 0),
(1489, 50, 0),
(1490, 50, 0),
(1491, 50, 0),
(1492, 50, 0),
(1493, 50, 0),
(1494, 50, 0),
(1495, 50, 0),
(1496, 50, 0),
(1497, 50, 0),
(1498, 50, 0),
(1499, 40, 1),
(1500, 40, 1),
(1501, 50, 0),
(1502, 50, 0),
(1503, 50, 0),
(1504, 50, 0),
(1505, 50, 0),
(1506, 50, 0),
(1507, 50, 0),
(1508, 50, 0),
(1509, 50, 0),
(1510, 50, 0),
(1511, 50, 0),
(1512, 50, 0),
(1513, 50, 0),
(1514, 50, 0),
(1515, 50, 0),
(1516, 50, 0),
(1517, 50, 0),
(1518, 50, 0),
(1519, 50, 0),
(1520, 50, 0),
(1521, 50, 0),
(1522, 50, 0),
(1523, 50, 0),
(1524, 50, 0),
(1525, 50, 0),
(1526, 50, 0),
(1527, 50, 0),
(1528, 80, 1),
(1529, 78, 1),
(1530, 80, 1),
(1531, 80, 1),
(1532, 50, 0),
(1533, 50, 0),
(1534, 50, 0),
(1535, 50, 0),
(1536, 50, 0),
(1537, 50, 0),
(1538, 50, 0),
(1539, 50, 0),
(1540, 50, 0),
(1541, 50, 0),
(1542, 60, 1),
(1543, 58, 1),
(1544, 50, 0),
(1545, 50, 0),
(1546, 50, 0),
(1547, 50, 0),
(1548, 50, 0),
(1549, 50, 0),
(1550, 50, 0),
(1551, 50, 0),
(1552, 50, 0),
(1553, 50, 0),
(1554, 50, 0),
(1555, 50, 0),
(1556, 50, 0),
(1557, 50, 0),
(1558, 50, 0),
(1559, 50, 0),
(1560, 50, 0),
(1561, 50, 0),
(1562, 50, 0),
(1563, 50, 0),
(1564, 50, 0),
(1565, 50, 0),
(1566, 50, 0),
(1567, 50, 0),
(1568, 50, 0),
(1569, 50, 0),
(1570, 50, 0),
(1571, 50, 0),
(1572, 50, 0),
(1573, 50, 0),
(1574, 50, 0);