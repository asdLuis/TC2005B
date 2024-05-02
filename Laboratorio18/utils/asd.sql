CREATE DATABASE IF NOT EXISTS users_test;

USE users_test;

# DROP DATABASE  users_test;

 CREATE TABLE IF NOT EXISTS asigna (
  username varchar(20) NOT NULL,
  idrol int(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE IF NOT EXISTS posee (
  idrol int(11) NOT NULL,
  idpermiso int(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE IF NOT EXISTS privilegio (
  id int(11) NOT NULL,
  permiso varchar(40) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE IF NOT EXISTS rol (
  id int(11) NOT NULL,
  nombre varchar(40) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE IF NOT EXISTS tiene (
  id int(11) NOT NULL,
  username varchar(20) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE IF NOT EXISTS tropa (
  id int(11) NOT NULL,
  clase varchar(50) NOT NULL,
  nivel int(11) NOT NULL,
  imagen varchar(255) NOT NULL,
  vida int(11) NOT NULL,
  ataque int(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE IF NOT EXISTS usuario (
  username varchar(20) NOT NULL,
  nombre varchar(200) NOT NULL,
  password varchar(400) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

ALTER TABLE `asigna`
  ADD PRIMARY KEY (`username`,`idrol`),
  ADD KEY `idrol` (`idrol`);
--
-- Indices de la tabla `posee`
--
ALTER TABLE `posee`
  ADD PRIMARY KEY (`idrol`,`idpermiso`),
  ADD KEY `idpermiso` (`idpermiso`);
--
-- Indices de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`id`);
--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);
--
-- Indices de la tabla `tiene`
--
ALTER TABLE `tiene`
  ADD PRIMARY KEY (`id`,`username`,`created_at`),
  ADD KEY `id` (`id`),
  ADD KEY `username` (`username`);
--
-- Indices de la tabla `tropa`
--
ALTER TABLE `tropa`
  ADD PRIMARY KEY (`id`);
--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`username`);
--
-- AUTO_INCREMENT de las tablas volcadas
--
--
-- AUTO_INCREMENT de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tropa`
--
ALTER TABLE `tropa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--
--
-- Filtros para la tabla `asigna`
--
ALTER TABLE asigna
  ADD CONSTRAINT asigna_ibfk_1 FOREIGN KEY (username) REFERENCES usuario (username),
  ADD CONSTRAINT asigna_ibfk_2 FOREIGN KEY (idrol) REFERENCES rol (id);
--
-- Filtros para la tabla `posee`
--
ALTER TABLE posee
  ADD CONSTRAINT posee_ibfk_1 FOREIGN KEY (idrol) REFERENCES rol (id),
  ADD CONSTRAINT posee_ibfk_2 FOREIGN KEY (idpermiso) REFERENCES privilegio (id);
--
-- Filtros para la tabla `tiene`
--
ALTER TABLE tiene
  ADD CONSTRAINT fk_tropas FOREIGN KEY (id) REFERENCES tropa (id),
  ADD CONSTRAINT fk_usuarios FOREIGN KEY (username) REFERENCES usuario (username);

INSERT INTO `usuario` (`username`, `nombre`, `password`, `created_at`) VALUES
('andrea', 'Andrea Medina Rico', '$2a$12$XTN3lOvdUVferZxggiaAJOLTqV4NPsxOEtyYgQGLjZAU1YGbVPvqC', '2024-03-11 18:48:01'),
('antonio', 'José Antonio López Saldaña', 'arteycultura', '2024-03-07 18:15:12'),
('kevin', 'Kevin Josué Martínez Leyva', 'tony123', '2024-03-11 18:26:13'),
('nico', 'Nicolás Hood Figueroa', '$2a$12$1JQ3yh2yev2TTs5jpDkz5uUDHSj2nkG7tv32T7evN9cM44V8DNMR2', '2024-03-11 18:46:42'),
('sebas', 'Sebastián Colín De La Barreda', '$2a$12$7Ij6iZ4wV4VziolRU/T5OOub.gAu0zSP.8Y7PTqZalosaaSkX8kyO', '2024-03-11 18:49:07');
--
-- Volcado de datos para la tabla `privilegio`
--
INSERT INTO `privilegio` (`id`, `permiso`, `created_at`) VALUES
(1, 'crear_tropa', '2024-03-12 17:58:45'),
(2, 'ver_clan', '2024-03-12 17:58:45');
--
-- Volcado de datos para la tabla `rol`
--
INSERT INTO `rol` (`id`, `nombre`, `created_at`) VALUES
(1, 'miembro', '2024-03-12 17:58:09'),
(2, 'colider', '2024-03-12 17:58:09'),
(3, 'lider', '2024-03-12 17:58:15');
--
-- Volcado de datos para la tabla `tropa`
--
INSERT INTO `tropa` (`id`, `clase`, `nivel`, `imagen`, `vida`, `ataque`, `created_at`) VALUES
(1, 'Bárbaro', 1, 'https://static.wikia.nocookie.net/clashofclans/images/8/87/Avatar_Barbarian.png', 10, 9, '2024-03-07 18:06:03'),
(2, 'arquera', 1, 'https://static.wikia.nocookie.net/clashofclans/images/6/68/Avatar_Archer.png', 8, 12, '2024-03-07 18:43:28'),
(3, 'Pekka', 1, 'https://static.wikia.nocookie.net/clashofclans/images/5/54/P.E.K.K.A_info.png', 180, 300, '2024-03-07 19:06:10'),
(4, 'Montapuercos', 1, 'https://pm1.aminoapps.com/6307/1debaffe6fcbe0764f01a6fd4f4085832510f31d_hq.jpg', 50, 40, '2024-03-07 19:12:24');

INSERT INTO `asigna` (`username`, `idrol`, `created_at`) VALUES
('andrea', 3, '2024-03-12 17:59:54'),
('nico', 1, '2024-03-12 17:59:54'),
('sebas', 2, '2024-03-12 18:00:06');
--
-- Volcado de datos para la tabla `posee`
--
INSERT INTO `posee` (`idrol`, `idpermiso`, `created_at`) VALUES
(2, 2, '2024-03-12 18:00:55'),
(1, 1, '2024-03-12 18:00:44'),
(3, 2, '2024-03-12 18:00:44');
--
-- Volcado de datos para la tabla `tiene`
--
INSERT INTO `tiene` (`id`, `username`, `created_at`) VALUES
(1, 'antonio', '2024-03-07 18:19:20');

