package com.ankool.ecom_proj.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    private String brand;

    private Double price;

    private String category;

    private LocalDate releaseDate;

    private Boolean availability;

    private Integer quantity;


    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageData;
}