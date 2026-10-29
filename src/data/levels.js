const block = (correct, alternatives) => ({ correct, options: [correct, ...alternatives] });

export const levels = [
  { id: 1, title: 'El primer pasadizo', door: 'Puerta del Saber', subtitle: 'Encuentra el registro de estudiantes.', parts: [
    { label: 'Elige qué buscar', ...block('SELECT *', ['SELECT nombre', 'DELETE *']) },
    { label: 'Elige dónde buscar', ...block('FROM estudiantes', ['FROM cursos', 'INTO estudiantes']) },
  ] },
  { id: 2, title: 'La cámara de notas', door: 'Arco de las Notas', subtitle: 'Une estudiantes con sus inscripciones.', parts: [
    { label: 'Columnas que necesitas', ...block('SELECT e.nombre, i.nota', ['SELECT *', 'SELECT e.nota, i.nombre']) },
    { label: 'Tabla principal y apodo', ...block('FROM estudiantes e', ['FROM inscripciones e', 'FROM cursos c']) },
    { label: 'Tabla que vas a unir', ...block('INNER JOIN inscripciones i', ['INNER JOIN cursos c', 'JOIN estudiantes i']) },
    { label: 'Conecta los identificadores', ...block('ON e.id_estudiante = i.id_estudiante', ['ON e.nombre = i.nota', 'ON e.id_estudiante = i.id_curso']) },
  ] },
  { id: 3, title: 'El gran archivo', door: 'Sello de los Alias', subtitle: 'Pon apodos a las columnas y ordena los resultados.', parts: [
    { label: 'Columnas con alias', ...block('SELECT e.nombre AS estudiante, i.nota AS nota', ['SELECT e.nombre, i.nota', 'SELECT estudiante AS e, nota AS i']) },
    { label: 'Tabla principal', ...block('FROM estudiantes e', ['FROM inscripciones i', 'FROM cursos c']) },
    { label: 'Tabla de inscripciones', ...block('INNER JOIN inscripciones i', ['INNER JOIN cursos c', 'JOIN estudiantes i']) },
    { label: 'Conexión por ID', ...block('ON e.id_estudiante = i.id_estudiante', ['ON e.nombre = i.nota', 'ON e.id_estudiante = i.id_curso']) },
    { label: 'Ordena por nombre', ...block('ORDER BY e.nombre', ['ORDER BY i.nota', 'ORDER BY estudiante']) },
  ] },
  { id: 4, title: 'El sello tripartito', door: 'Portal de las Tres Tablas', subtitle: 'Conecta las tres tablas para revelar el archivo.', parts: [
    { label: 'Columnas y nombres mágicos', ...block('SELECT e.nombre AS estudiante, c.nombre_curso AS curso, c.instructor AS instructor, i.nota AS nota', ['SELECT *', 'SELECT e.nombre, i.nota']) },
    { label: 'Tabla de estudiantes', ...block('FROM estudiantes e', ['FROM cursos c', 'FROM inscripciones i']) },
    { label: 'Une las inscripciones', ...block('INNER JOIN inscripciones i', ['INNER JOIN cursos c', 'INNER JOIN estudiantes e']) },
    { label: 'Conecta estudiantes', ...block('ON e.id_estudiante = i.id_estudiante', ['ON e.id_estudiante = i.id_curso', 'ON e.nombre = i.nota']) },
    { label: 'Une los cursos', ...block('INNER JOIN cursos c', ['INNER JOIN estudiantes e', 'INNER JOIN notas n']) },
    { label: 'Conecta los cursos', ...block('ON i.id_curso = c.id_curso', ['ON i.id_estudiante = c.id_curso', 'ON e.id_curso = i.id_estudiante']) },
    { label: 'Ordena por estudiante y curso', ...block('ORDER BY e.nombre, c.nombre_curso', ['ORDER BY i.nota', 'ORDER BY c.instructor']) },
  ] },
];

export const maze = ['############', '#P....#...T#', '#.##..#.#..#', '#.....#....#', '###.#......#', '#...#..##D.#', '#T.........#', '#..........#', '############'];
export const levelTiles = levels.map(() => ({ treasures: [{ x: 10, y: 1 }, { x: 1, y: 6 }], door: { x: 9, y: 5 } }));