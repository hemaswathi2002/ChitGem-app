import ReviewsForm from "./ReviewsForm"
import { useDispatch, useSelector } from 'react-redux'
import { setServerErrors } from "../Actions/Reviews"
import { useEffect } from 'react' 
import ReviewsTable from "./ReviewsTable"

export default function ReviewsContainer() {
    const dispatch = useDispatch()
    const reviews = useSelector((state) => {
        return state.reviews
    })

    useEffect(() => {
        return () => {
            dispatch(setServerErrors([]))
        }
    }, [dispatch])

    return (
        <div className="row">
            {/* <h2>Total Products - { products.data.length }</h2> */}
            <div className="col-md-8">
                <ReviewsTable reviews={reviews} />
            </div>
            <div className="col-md-4">
                <h2>Add Review</h2>
                <ReviewsForm />
            </div>
        </div>
    )
}