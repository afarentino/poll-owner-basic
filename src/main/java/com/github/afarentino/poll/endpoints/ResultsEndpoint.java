package com.github.afarentino.poll.endpoints;

import java.util.List;

import com.github.afarentino.poll.Entry;
import com.github.afarentino.poll.service.EntryService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;


@Endpoint
@AnonymousAllowed
public class ResultsEndpoint {

    private EntryService service;

    public ResultsEndpoint(EntryService service) {
        this.service = service;
    }
    public @Nonnull List<@Nonnull Entry> findAll() {
        return service.findAll();
    }
}
