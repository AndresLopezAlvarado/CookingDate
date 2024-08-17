async function fetchData() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );

    if (!response.ok) {
      throw new Error("Ocurrió un error al obtener los datos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw new Error(error);
  }
}

export default fetchData;
