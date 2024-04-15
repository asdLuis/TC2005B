CREATE DATABASE XD;
USE XD;

CREATE TABLE Materiales (
  Clave INT NOT NULL AUTO_INCREMENT,
  Descripcion VARCHAR(100) NOT NULL,
  Precio INT NOT NULL,
  PRIMARY KEY (Clave)
);

CREATE TABLE Proyectos (
  Numero INT NOT NULL AUTO_INCREMENT,
  Denominacion VARCHAR(100) NOT NULL,
  PRIMARY KEY (Numero)
);

CREATE TABLE Proveedores (
  RFC VARCHAR(15) NOT NULL,
  RazonSocial VARCHAR(100) NOT NULL,
  PRIMARY KEY (RFC)
);

CREATE TABLE Entregan(
	Clave INT NOT NULL,
    RFC VARCHAR(15) NOT NULL,
    Numero INT NOT NULL,
    Fecha DATE NOT NULL,
    Cantidad INT NOT NULL,
    PRIMARY KEY (Clave, RFC, Numero, Fecha),
    FOREIGN KEY (Clave) REFERENCES Materiales(Clave),
    FOREIGN KEY (RFC) REFERENCES Proveedores(RFC),
    FOREIGN KEY (Numero) REFERENCES Proyectos(Numero)
);

SELECT RFC FROM Entregan;