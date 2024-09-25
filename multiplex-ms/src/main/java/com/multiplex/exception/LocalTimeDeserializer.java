package com.multiplex.exception;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;


public class LocalTimeDeserializer extends JsonDeserializer<List<LocalTime>> {
    @Override
    public List<LocalTime> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        List<LocalTime> times = new ArrayList<>();
        JsonNode node = p.getCodec().readTree(p);
        
        for (JsonNode timeNode : node) {
            String timeString = timeNode.asText().trim();
            try {
                times.add(LocalTime.parse(timeString, DateTimeFormatter.ISO_TIME));
            } catch (DateTimeParseException e) {
                // Try with pattern to handle leading zeros
                times.add(LocalTime.parse(timeString, DateTimeFormatter.ofPattern("H:mm:ss")));
            }
        }
        
        return times;
    }
}
