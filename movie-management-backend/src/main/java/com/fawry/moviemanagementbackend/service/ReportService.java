package com.fawry.moviemanagementbackend.service;

import com.fawry.moviemanagementbackend.dto.MovieRatingReportDTO;
import net.sf.jasperreports.engine.*;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    public byte[] generateMovieRatingsReport(List<MovieRatingReportDTO> movieRatings) {
        try {
            // Load the JasperReport template
            InputStream reportTemplate = getClass().getResourceAsStream("/reports/movie_ratings_report.jrxml");
            JasperReport jasperReport = JasperCompileManager.compileReport(reportTemplate);

            // Create the data source
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(movieRatings);

            // Fill the report
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, Map.of(), dataSource);

            // Export to PDF
            return JasperExportManager.exportReportToPdf(jasperPrint);
        } catch (JRException e) {
            throw new RuntimeException("Failed to generate movie ratings report", e);
        }
    }
}