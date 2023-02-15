import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:8080';

export const apiSlide = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: builder =>({
        // get Categories
        getCategories: builder.query({
            // get: http://localhost:8080/api/categories
            query: ()=> '/api/categories',
            providesTags: ['categories']   // this will help to update your UI
        }), 
        // get labels
        getLabels: builder.query({
            query: ()=> '/api/labels',
            providesTags: ['transaction'] 
        }),
        // get Transactions
        getTransaction: builder.query({
            query: ()=> '/api/transaction',
            providesTags: ['transaction']
        }),
        // add new transaction
        addTransaction: builder.mutation({   //if you want CRUD transaction
            //post: http://localhost:8080/api/transaction      
            query: (initialTransaction)=> ({
                url: '/api/transaction',
                method: 'POST',
                body: initialTransaction
            }),
            invalidatesTags: ['transaction']
        }),
        // delete record
        deleteTransaction: builder.mutation({
            //delete: http://localhost:8080/api/transaction
            query: recordID => ({
                url: '/api/transaction',
                method: 'DELETE',
                body: recordID
            }),
            invalidatesTags: ['transaction']
        }),
        // update record 
        updateTransaction: builder.mutation({
            //update: http://localhost:8080/api/transaction
            query: payload =>({
                url: '/api/transaction',
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['transaction']
        })
    })
})

export default apiSlide;