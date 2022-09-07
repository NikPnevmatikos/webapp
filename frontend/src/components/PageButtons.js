import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function PageButtons({ pages, page, keyword = '', productScreen = false, adminScreen = false, bidScreen = false }) {
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={!productScreen ? 
                                !adminScreen ?
                                    !bidScreen ?
                                        `/?keyword=${keyword}&page=${x + 1}`

                                    : `/myBids/?keyword=${keyword}&page=${x + 1}`
                                    
                                : `/admin/?keyword=${keyword}&page=${x + 1}`

                            : `/myProducts/?keyword=${keyword}&page=${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default PageButtons