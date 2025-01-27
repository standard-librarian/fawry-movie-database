package com.fawry.moviemanagement.auth.dto;

import com.fawry.moviemanagement.auth.model.User;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private User user;
}