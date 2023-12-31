/* (C)2023 */
package com.thelittlebigtalents.backend.model.impl;

import com.thelittlebigtalents.backend.model.api.AbstractPersistableDocument;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
/** The Navbar POJO. */
public class Navbar extends AbstractPersistableDocument {
    private List<NavbarItem> content;

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
