CREATE PROCEDURE GetProjects(
    IN estado_param INT,
    IN filtro_param VARCHAR(50),
    IN limite_param INT,
    IN offset_param INT,
    IN userId_param INT
)
BEGIN

    SELECT
        proyecto.IDProyecto,
        trabaja.IDColaborador,
        proyecto.IDCliente,
        proyecto.Nombre,
        proyecto.FechaInicio,
        proyecto.FechaFinal,
        proyecto.Tipo,
        proyecto.Estado,
        COALESCE(SUM(presenta.PonderacionRelativa), 0) AS PonderacionRelativaTotal
    FROM
        proyecto
    LEFT JOIN
        presenta ON proyecto.IDProyecto = presenta.IDProyecto
    LEFT JOIN
        trabaja ON proyecto.IDProyecto = trabaja.IDProyecto AND trabaja.IDColaborador = userId_param
    WHERE
        proyecto.Estado = estado_param
    GROUP BY
        proyecto.IDProyecto,
        proyecto.IDCliente,
        proyecto.Nombre,
        proyecto.FechaInicio,
        proyecto.FechaFinal,
        proyecto.Tipo,
        proyecto.Estado,
        CASE WHEN filtro_param = 'assigned' THEN trabaja.IDColaborador END DESC
    ORDER BY
        CASE WHEN filtro_param = 'recent' THEN proyecto.FechaInicio END DESC,
        CASE WHEN filtro_param = 'older' THEN proyecto.FechaInicio END ASC,
        CASE WHEN filtro_param = 'higher' THEN COALESCE(SUM(presenta.PonderacionRelativa), 0) END DESC,
        CASE WHEN filtro_param = 'assigned' THEN trabaja.IDColaborador END DESC,
        proyecto.IDProyecto ASC
    LIMIT
        limite_param OFFSET offset_param;
END;

CREATE PROCEDURE HighlightProject(
    IN P_IDProyecto INT,
    IN U_IDUsuario INT
)
BEGIN
    DECLARE usuarioID INT;

    -- Verificar si el usuario ya existe en la tabla Trabaja
    SELECT IDColaborador INTO usuarioID FROM Trabaja WHERE IDColaborador = U_IDUsuario AND IDProyecto = P_IDProyecto;

    IF usuarioID IS NOT NULL THEN
        -- Si el usuario existe, eliminar el registro correspondiente
        DELETE FROM Trabaja WHERE IDColaborador = U_IDUsuario AND IDProyecto = P_IDProyecto;
    ELSE
        INSERT INTO Trabaja (IDProyecto, IDColaborador)
        VALUES (P_IDProyecto, U_IDUsuario);
    END IF;
END;

CREATE PROCEDURE InsertRisk(
    IN R_Nombre VARCHAR(80),
    IN R_Descripcion VARCHAR(512),
    IN R_Tipo VARCHAR(32)
)
BEGIN
    DECLARE riskID INT;

    -- Verificar si el riesgo ya existe
    SELECT IDRiesgo INTO riskID FROM RIESGO WHERE Nombre = R_Nombre;

    -- Si el riesgo no existe
    IF riskID IS NULL THEN
        INSERT INTO Riesgo (Nombre, Descripcion, Tipo)
        VALUES (R_Nombre, R_Descripcion, R_Tipo);
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Risk with the same ID already exists';
    END IF;
END;