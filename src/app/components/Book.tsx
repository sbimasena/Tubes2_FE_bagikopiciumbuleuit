import React from "react";
import Image from "next/image";

const Book = () => {
    return(
        <div className="flex flex-col gap-4">
            <Image src="/images/full-book.svg" width={1200} height={1200} alt="book"/>
        </div>
    )
}

export default Book;