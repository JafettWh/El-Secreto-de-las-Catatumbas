export const databaseSchema = [
  { name: 'estudiantes', icon: '📜', description: 'Cada aprendiz de la academia.', columns: [['id_estudiante', 'INT · ID'], ['nombre', 'TEXT'], ['edad', 'INT']], rows: [['1', 'Luna', '9'], ['2', 'Teo', '10'], ['3', 'Mía', '8']] },
  { name: 'inscripciones', icon: '🗝️', description: 'Las notas de cada estudiante.', columns: [['id_estudiante', 'INT · ID'], ['id_curso', 'INT · ID'], ['nota', 'INT']], rows: [['1', '1', '95'], ['2', '2', '88'], ['3', '1', '100']] },
  { name: 'cursos', icon: '📚', description: 'Clases de la escuela de magia.', columns: [['id_curso', 'INT · ID'], ['nombre_curso', 'TEXT'], ['instructor', 'TEXT']], rows: [['1', 'Pociones', 'Mago Olmo'], ['2', 'Runas', 'Bruja Sol']] },
];