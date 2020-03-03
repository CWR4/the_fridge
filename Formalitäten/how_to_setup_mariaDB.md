# MariaDB Setup

### Installation

MariaDB muss lokal installiert werden. Der Vorgang ist für Windows und Linux unterschiedlich, daher bitte entweder die Dokumentation zu Rate ziehen oder googlen. [Hier](https://downloads.mariadb.org/) finden sich die Downloads. Unter diesem Link einfach den neuesten Stable-Release passend für das jeweilige OS runterladen.

### Setup

 - MariaDB starten
 - Terminal (oder unter Windows git-bash) öffnen und eingeben:
```console
$ mysql -u username -p
```
 - Anschließend in der nun geöffneten mySQL-Shell eine neue Datenbank anlegen:
 ```console
$ CREATE DATABASE the_fridge;
```
 - Anschließend die mySQL-Shell schließen (STRG-D) und folgenden Befehl im Terminal in der Directory "the_fridge/server/" ausführen:
  ```console
$ mysql -u username -p the_fridge < the_fridge_sql_dump.sql
```
- Um die Datenbank zu nutzen und SQL-Befehle auf ihr auszuführen: 
```console
$ mysql -u username -p
$ use the_fridge;
```

