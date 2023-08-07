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

    /**
     * Find survey entries between the start and end dates only
     * @param startDate - Date string in form "MM/DD/YYYY"
     * @param endDate - Date string in form "MM/DD/YYYY"
     *
     * @return - List of matching entries or empty List when none are found
     */
    public @Nonnull List<@Nonnull Entry> findBetween(@Nonnull String startDate, @Nonnull String endDate) {
        List<Entry> entries = service.findBetween(startDate, endDate);
        return entries;
    }
}
