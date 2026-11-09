package com.ankool.ecom_proj.controller;
import jakarta.servlet.http.HttpServletRequest;
import org.jspecify.annotations.NonNull;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.transaction.annotation.Transactional;
import com.ankool.ecom_proj.model.Product;
import com.ankool.ecom_proj.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductService service;

    @RequestMapping("/")
    public String greet(HttpServletRequest request) {
        return "Doing Spring Security "+ request.getSession().getId();
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(){
        return new ResponseEntity<>(service.getAllProduct(),HttpStatus.OK);
    }
    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") int id){
        Product product = service.getProduct(id);
        if(product != null){
            return new ResponseEntity<>(product,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }


    @GetMapping("/csrftoken")
    public CsrfToken getToken(@NonNull HttpServletRequest request){
        return (CsrfToken) request.getAttribute("_csrf");
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestPart Product product,
                                        @RequestPart MultipartFile imageFile)
    {
        try{
            Product newProduct = service.addProduct(product,imageFile);
        return new ResponseEntity<>(newProduct,HttpStatus.ACCEPTED);
    }
        catch(Exception e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);}
    }

    @GetMapping("/product/{id}/image")
    public ResponseEntity<byte[]> getImageById(@PathVariable int id){
        Product product = service.getProduct(id);
//        byte[] imageFile=product.getImageData();

        return ResponseEntity.ok()
//                .contentType(MediaType.valueOf(product.getImageType()))
                .body(product.getImageData());

    }

    @PutMapping("/product/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id,
                                                @RequestPart Product product,
                                                @RequestPart(required = false)MultipartFile imageFile){

        Product product2= null;
        try {
            product2 = service.updateProduct(id,product,imageFile);
        } catch (IOException e) {
            return new ResponseEntity<>("Faild to update",HttpStatus.BAD_REQUEST);
        }
        if(product2 != null){
            return new ResponseEntity<>("Done",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Failed to update",HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        Product product = service.getProduct(id);
        if(product != null){
            service.deleteProduct(id);
            return new ResponseEntity<>("Deleted",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Failed to Delete",HttpStatus.BAD_REQUEST);
        }

    }
    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword){
        IO.println("search products"+keyword);
        List<Product> products=service.searchProduct(keyword);
            return new ResponseEntity<>(products,HttpStatus.OK);
    }
}
