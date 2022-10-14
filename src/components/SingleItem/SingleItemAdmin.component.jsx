import { useState } from "react";
import Loading from "../../components/Loading/Loading.component";

const SingleItemAdmin = ({ item, onAddToCart, quantityInputRef }) => {
  const { title, image, category, price, id, description } = item;

  const [adminStatus, setAdminStatus] = useState(false);

  const [adminTitle, setAdminTitle] = useState(title);
  const [adminDescription, setAdminDiscription] = useState(description);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [loading, setLoading] = useState(false);

  const helperSendDataToServer = async (title, description) => {
    setLoading(true);
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: { title },
        description: { description },
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
    setLoading(false);
  };

  const handleSaveChanges = () => {
    if (adminTitle.trim().length === 0) {
      setTitleError("Поле title не должно быть пустым");
      return;
    } else {
      setTitleError("");
    }
    if (adminDescription.trim().length === 0) {
      setDescriptionError("Поле description не должно быть пустым!");
      return;
    } else {
      setDescriptionError("");
    }
    helperSendDataToServer(adminTitle, adminDescription);
  };

  const handleAbortChanges = () => {
    setAdminTitle(title);
    setAdminDiscription(description);
  };

  return (
    <div className="item_page">
      <div className="item-block">
        {adminStatus ? (
          <>
            {loading ? <Loading /> : null}
            {titleError || descriptionError
              ? "Есть ошибки, проверьте поля"
              : null}
            <button onClick={handleSaveChanges}>Сохранить</button>
            <button onClick={handleAbortChanges}>Отменить</button>
          </>
        ) : (
          <button onClick={() => setAdminStatus(true)}>Редактировать</button>
        )}
        {adminStatus ? (
          <>
            <input
              maxLength={30}
              value={adminTitle}
              onChange={(e) => setAdminTitle(e.target.value)}
            />
            {titleError ? <label>{titleError}</label> : null}
          </>
        ) : (
          <div className="item-page-title">{title}</div>
        )}
        <img className="menu__img1" src={image} alt={title}></img>
        {adminStatus ? (
          <>
            <textarea
              className="textarea"
              maxLength={600}
              rows="7"
              value={adminDescription}
              onChange={(e) => setAdminDiscription(e.target.value)}
            />
            <label>Number of characters: {adminDescription.length}/600</label>
            {descriptionError ? <label>{descriptionError}</label> : null}
          </>
        ) : (
          <div> {description}</div>
        )}
        <div className="menu__category">
          Category: <span>{category}</span>
        </div>
        <div className="menu__price">
          Price: <span>{price}$</span>
        </div>

        <>
          <div className="item-page-quantitiy-container">
            <div>
              <label className="quantity-label">Количество:</label>
              <input
                type={"number"}
                ref={quantityInputRef}
                placeholder={"Количество товаров"}
              />
            </div>
            <button
              onClick={() => onAddToCart(id, quantityInputRef.current.value)}
              className="item-page-btn"
            >
              Добавить в корзину
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default SingleItemAdmin;
