package com.github.afarentino.poll.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.github.afarentino.poll.Entry;

/**
 * The EntryService provides access to persisted survey results
 *
 */
@Service
public class EntryService {
    private final MongoTemplate mongoTemplate;

    @Autowired
    public EntryService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<Entry> findAll() {
        List<Entry> results = mongoTemplate.findAll(Entry.class, "entries");
        return results;
    }

    public List<Entry> findBetween(String startDate, String endDate) {
        Criteria dateCriteria = Criteria.where("timeStamp").gt(startDate).lt(endDate);

        Query q = new Query(dateCriteria);
        return mongoTemplate.find(q, Entry.class, "entries");
    }
}
