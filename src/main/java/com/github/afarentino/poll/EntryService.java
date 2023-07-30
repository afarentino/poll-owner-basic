package com.github.afarentino.poll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
@Service
public class EntryService {
    private final MongoTemplate mongoTemplate;

    @Autowired
    public EntryService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }
}
