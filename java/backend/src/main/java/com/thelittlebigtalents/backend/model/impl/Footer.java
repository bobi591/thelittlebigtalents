/* (C)2023 */
package com.thelittlebigtalents.backend.model.impl;

import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.codecs.pojo.annotations.BsonIgnore;
import org.bson.codecs.pojo.annotations.BsonProperty;

@Getter
@Setter
/** The Footer POJO. */
public class Footer implements PersistableDocument {
    @BsonIgnore private String className = this.getClass().getName();
    private String facebookUrl;
    private String instagramUrl;
    private String tiktokUrl;
    private String youtubeUrl;
    private Contacts contacts;
    private WorkingHours workingHours;

    @NoArgsConstructor
    @Getter
    @Setter
    public static class Contacts {
        @BsonProperty private String phone;
        @BsonProperty private String email;

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

    @NoArgsConstructor
    @Getter
    @Setter
    public static class WorkingHours {
        @BsonProperty private List<String> hours;

        public List<String> getHours() {
            return hours;
        }

        public void setHours(List<String> hours) {
            this.hours = hours;
        }
    }
}
