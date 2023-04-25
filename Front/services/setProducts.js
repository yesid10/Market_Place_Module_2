//Set products favorites
const setProducts = async (url, product) => {
    try {
      const { data } = await axios.post(url, product);
  
    } catch (error) {
      console.log(error);
      alert("Sr Usuario, ocurrió un error")
      return {};
    }
  };

export default setProducts;