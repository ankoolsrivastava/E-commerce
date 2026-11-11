package com.ankool.ecom_proj.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ankool.ecom_proj.model.Product;
import com.ankool.ecom_proj.service.ProductService;

import java.io.IOException;

@RestController
@RequestMapping("/test")
public class PreAuthorizeTestController {

    @Autowired
    private ProductService service;

    @PostMapping("/add")
    public ResponseEntity<?> testAddProduct( @RequestPart Product product,
            @RequestPart MultipartFile imageFile) throws IOException {
            return ResponseEntity.ok(
                service.addProduct(product, imageFile)
        );
    }
}