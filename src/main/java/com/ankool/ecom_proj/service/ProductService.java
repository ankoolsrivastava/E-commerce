package com.ankool.ecom_proj.service;

import com.ankool.ecom_proj.model.Product;
import com.ankool.ecom_proj.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepo repo;

    public List<Product> getAllProduct() {
        return repo.findAll();
    }

    public Product getProduct(int id) {
        return repo.findById(id).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        return repo.save(product);
    }

    public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            product.setImageData(imageFile.getBytes());
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
        }else{
            Product existingProduct=repo.findById(id).orElse(null);
            if(existingProduct!=null){
                product.setImageName(existingProduct.getImageName());
                product.setImageType(existingProduct.getImageType());
                product.setImageData(existingProduct.getImageData());
            }
        }

            product.setId(id);
            return repo.save(product);
        }

    public void deleteProduct(int id) {
        repo.deleteById(id);
    }

    public List<Product> searchProduct(String keyword) {
        return repo.searchProducts(keyword);
    }
}
