package com.ssafy.health.common.s3.service;

import com.ssafy.health.common.s3.exception.S3FileTypeException;
import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Service {

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    private S3Template s3Template;

    public String uploadFile(MultipartFile file) throws IOException {

        String contentType = file.getContentType();
        if (contentType.equals(MediaType.IMAGE_JPEG_VALUE) || contentType.equals(MediaType.IMAGE_PNG_VALUE) ||
                contentType.equals(MediaType.IMAGE_GIF_VALUE)) {
            String randomFilename = generateRandomFilename(file);
            S3Resource resource = s3Template.upload(bucket, generateRandomFilename(file), file.getInputStream());
            log.debug("Uploaded file {} as {}, resource: {}",
                    file.getOriginalFilename(), randomFilename, resource.toString());
            return resource.getURL().toString();
        } else {
            throw new S3FileTypeException();
        }
    }

    // 랜덤 파일명 생성
    private String generateRandomFilename(MultipartFile multipartFile) {
        String originalFilename = multipartFile.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1)
                .toLowerCase();
        return UUID.randomUUID() + "." + fileExtension;
    }
}
