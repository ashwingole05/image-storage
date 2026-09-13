package com.image_storage.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "images")
public class Image {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   private String name;
   private String type;

    @JdbcTypeCode(SqlTypes.VARBINARY)
    @Column(columnDefinition = "BYTEA")
    private byte[] data;

   public Image(){

   }

   public Image(String name, String type, byte[] data) {
       this.name = name;
       this.type = type;
       this.data = data;
   }

   public Long getId() {
       return id;
   }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
