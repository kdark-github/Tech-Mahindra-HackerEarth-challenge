import React from "react";
import { useToggle } from "../../utils/hooks";
import { Paper, Button, Grid } from "@mui/material";
import styles from "./product.style.module.css";

const Product = ({ value, onSubmit }) => {
  const [product, setProduct] = React.useState({
    name: "",
    _id: undefined,
    type: "",
    imageLink: "",
  });

  const [edit, toggleEdit] = useToggle(false);

  React.useEffect(() => {
    const { name, _id, type, imageLink } = value;

    setProduct({
      name,
      _id,
      type,
      imageLink,
    });
  }, [value]);
  return (
    <Paper className={styles.productPaper}>
      <div className={styles.editProductCtn}>
        <Button>{edit ? "Save" : "Edit"}</Button>
      </div>
      <div className={styles.mainProductCtn}>
        <img src={product.imageLink} width="120" height="120" alt={product.name} />
        <div className={styles.productDetail}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productType}>{product.type.name}</p>
        </div>
        <div className={styles.productPrice}>
            <Button>Add To Cart</Button>
        </div>
      </div>
    </Paper>
  );
};

export default Product;
