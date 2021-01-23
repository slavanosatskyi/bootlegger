import "Animation.scss"

const Animated = ({animation, children}) => (
    <div animation={animation}>
        {children}
    </div>
)