export default function MarqueeLanding() {
    return (
        <div className="relative flex overflow-x-hidden bg-white">
            {/* First Marquee Set */}
            <div className="py-12 animate-marquee whitespace-nowrap flex">
                {renderCards()}
                {renderCards()} {/* Duplicate for seamless effect */}
            </div>

            {/* Second Marquee Set for opposite direction */}
            <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex">
                {renderCards()}
                {renderCards()} {/* Duplicate for seamless effect */}
            </div>
        </div>
    );
}

function renderCards() {
    const reviews = [
        { stars: '⭐⭐⭐⭐⭐', text: 'Incredible resource for guitarists!', author: 'John D.' },
        { stars: '⭐⭐⭐⭐', text: 'Easy to use and very helpful.', author: 'Sarah M.' },
        { stars: '⭐⭐⭐⭐⭐', text: 'Best guitar learning platform!', author: 'Mike R.' },
        { stars: '⭐⭐⭐⭐⭐', text: 'Transformed my guitar skills.', author: 'Emma L.' },
        { stars: '⭐⭐⭐⭐', text: 'Great selection of songs!', author: 'Alex W.' },
        { stars: '⭐⭐⭐⭐⭐', text: 'Highly recommend for beginners.', author: 'Lisa T.' },
    ];

    return reviews.map((review, index) => (
        <div key={index} className="mx-4 bg-white p-6 rounded-xl border border-gray-100 font-libre">
            <p className="text-xl mb-3">{review.stars}</p>
            <p className="text-base mb-2">"{review.text}"</p>
            <p className="text-sm text-gray-600">- {review.author}</p>
        </div>
    ));
}
