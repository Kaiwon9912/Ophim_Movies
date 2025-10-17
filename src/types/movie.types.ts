export interface MovieListResponse {
  status: string
  message: string
  data: MovieListData
}

export interface MovieListData {
  seoOnPage: {
    titleHead: string
    descriptionHead: string
  }
  items: Movie[]
  params: {
    pagination: Pagination
  }
  APP_DOMAIN_CDN_IMAGE: string
  APP_DOMAIN_FRONTEND: string
}

export interface Movie{
    _id: string
    name: string
    slug: string
    origin_name: string
    content: string
    type: "series" | "single"
    thumb_url: string
    poster_url:string
    trailer_url:string
    year: number,
    category: string[]
    status: string
    time: string
    episode_current: string
    episode_total: string
    quality: string
    views: number
    actor : string []
    imdb: imdb
    episodes: Episode[]
    director: string
    lang: string
    country: [
      {
        id: string,
        name: string
        slug: string
      }
    ]

}
export interface imdb{
  id: string
  type: string
  season: number
  vote_average: number
  vote_count: number
  
}

export interface MovieDetailResponse {
  status: string
  data: {
    breadCrumb: BreadCrumb[]
    item: Movie
  }
  params:{
    pagination: Pagination
  }
}
export interface MovieDetail{
  breadCrumb: BreadCrumb[]
  item: Movie
}

export interface BreadCrumb {
  name: string
  slug: string
  position: number
}

export interface Country {
    id: string
    name: string
    slug: string
}

export interface Category{
    id:string
    name: string
    slug: string

}

export interface Pagination{
    currentPage: number
    totalItems: number
    totalItemsPerPage: number
    pageRange: number

}

export type ServerData = {
  name: string
  slug: string
  filename: string
  link_embed: string
  link_m3u8: string
}

export type Episode = {
  is_ai: boolean
  server_name: string
  server_data: ServerData[]
}

export type Item = {
  name: string
  slug: string
}