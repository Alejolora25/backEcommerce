import React, { useState } from 'react';
import * as productService from "../../../services/ProductService";
import { Modal, Button, Form } from 'react-bootstrap';

<<<<<<< Updated upstream
export const CardManageProduct = ({ product, onEditClick, onDeleteClick}) => {
    return (
        <div className='row'>
            <div className="col-10 card-product ">
                <div className="card-body  d-flex flex-row align-items-center">
                    <h4 className="col card-title mx-1">{product.id}</h4>
                    <p className="col card-text mx-1">{product.name_product}</p>
                    <p className="col card-text mx-1">{product.price_product}</p>
                    <p className="col card-text mx-1">{product.quantity_product}</p>
                    <p className="col card-text mx-1">{product.isActive ? 'Activo' : 'Inactivo'}</p>
                </div>
            </div>
            <div className='col-2 d-flex align-items-center'>
                <button className="btn btn-warning mx-1" onClick={onEditClick}>Edit</button>
                <button className="btn btn-danger mx-1" onClick={onDeleteClick}>Delete</button>
            </div>
        </div >
    )
}
=======
export const CardManageProduct = ({ product }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editProduct, setEditProduct] = useState({ ...product });

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await productService.updateProductService(product.id, editProduct);
      setShowEditModal(false);
      // Add any additional logic you need after saving changes
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await productService.deleteProductService(product.id);
      setShowDeleteModal(false);
      // Add any additional logic you need after deleting the product
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className='row'>
      <div className="col-10 card-product">
        <div className="card-body d-flex flex-row align-items-center">
          <h4 className="col card-title mx-1">{product.id}</h4>
          <p className="col card-text mx-1">{product.name_product}</p>
          <p className="col card-text mx-1">{product.price_product}</p>
          <p className="col card-text mx-1">{product.quantity_product}</p>
          <p className="col card-text mx-1">{product.isActive ? 'Activo' : 'Inactivo'}</p>
        </div>
      </div>
      <div className='col-2 d-flex align-items-center'>
        <button onClick={handleEdit} className="btn btn-warning mx-1">Edit</button>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNameProduct">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name_product"
                value={editProduct.name_product}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formPriceProduct">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="text"
                name="price_product"
                value={editProduct.price_product}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantityProduct">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control
                type="text"
                name="quantity_product"
                value={editProduct.quantity_product}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formIsActive">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="Active"
                checked={editProduct.isActive}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, isActive: e.target.checked })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CardManageProduct;
>>>>>>> Stashed changes

import React, { useEffect, useState } from "react";
import { CardManageProduct } from "./CardManageProduct";
import * as productService from "../../../services/ProductService";
import ButtonAdd from "../../ButtonAdd";
import ModalProduct from "./ModalProduct";
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";


const ListManageProduct = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getProducts = async (page) => {
    const data = await productService.getAProductsPages(page);
    setProducts(data.products);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);
  };

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
<<<<<<< Updated upstream
      <ButtonAdd onClick={handleShow}/>
      <ModalProduct show={show} handleClose={handleClose}/>
      <ModalDelete showDelete={showDelete} handleCloseDelete={handleCloseDelete}/>
      <ModalUpdate showUpdate={showUpdate} handleCloseUpdate={handleCloseUpdate}/>
=======
      <ButtonAdd />

>>>>>>> Stashed changes
      <div className="d-flex flex-column mt-3">
        {products?.map((product) => (
          <div key={product.id} className="mb-4">
            <CardManageProduct  onEditClick={handleShowUpdate} onDeleteClick={handleShowDelete} key={product.id} product={product} />
          </div>
        ))}
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={handlePrevious}>
              Previous
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              key={index + 1}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(index + 1);
                }}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <a className="page-link" href="#" onClick={handleNext}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ListManageProduct;


const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export const getProductsService = async () => {
  const response = await fetch(API_URL + "/");
  if (!response.ok) {
    throw new Error('Error de conexión');
  }
  const data = await response.json();
  return data;
};

export const getAProductsPages = async (page) => {
  const response = await fetch(`${API_URL}/pages?page=${page}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const updateProductService = async (productId, updatedProductData) => {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProductData),
  });
  if (!response.ok) {
    throw new Error('Error updating product');
  }
  const updatedProduct = await response.json();
  return updatedProduct;
};

export const deleteProductService = async (productId) => {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting product');
  }
  return response.json();
};