/* (C)2023 */
package com.thelittlebigtalents.backend.model.impl;

import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
/** The Navbar POJO. */
public class Navbar implements PersistableDocument {
    public List<NavbarItem> content;

    @NoArgsConstructor
    @Getter
    @Setter
    public static class NavbarItem {
        public boolean hasDividerOnTop;
        public String name;
        public String href;
        public List<NavbarItem> childItems;
    }
}
