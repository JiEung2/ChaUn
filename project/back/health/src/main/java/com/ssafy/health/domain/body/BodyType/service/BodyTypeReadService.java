package com.ssafy.health.domain.body.BodyType.service;

import com.ssafy.health.domain.body.BodyType.entity.BodyType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BodyTypeReadService {

    public Float bodyTypeCoverter(BodyType bodyType) {
        Long typeId = (bodyType.getId() > 10) ? bodyType.getId() - 10 : bodyType.getId();
        return typeId > 6 ? (float) typeId - 6 : (float) typeId;
    }
}
