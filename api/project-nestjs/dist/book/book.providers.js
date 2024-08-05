"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoProviders = void 0;
const book_entity_1 = require("../typeorm/book.entity");
exports.photoProviders = [
    {
        provide: 'BOOK_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(book_entity_1.Book),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=book.providers.js.map