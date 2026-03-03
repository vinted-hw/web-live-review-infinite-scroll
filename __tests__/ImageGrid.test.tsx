import { render, screen } from "@testing-library/react";
import ImageGrid from "@/app/components/ImageGrid";

describe("ImageGrid", () => {
  it("renders a photo", () => {
    render(
      <ImageGrid
        photos={[
          {
            id: 1,
            width: 800,
            height: 600,
            url: "https://www.pexels.com/photo/1",
            photographer: "John",
            photographer_url: "https://www.pexels.com/@john",
            photographer_id: 1,
            avg_color: "#7B7267",
            src: {
              original: "https://images.pexels.com/photos/1/pexels-photo-1.jpeg",
              large2x: "https://images.pexels.com/photos/1/pexels-photo-1.jpeg?w=1280",
              large: "https://images.pexels.com/photos/1/pexels-photo-1.jpeg?w=940",
              medium: "https://images.pexels.com/photos/1/pexels-photo-1.jpeg?w=350",
              small: "https://images.pexels.com/photos/1/pexels-photo-1.jpeg?w=130",
              portrait: "https://images.pexels.com/photos/1/pexels-photo-1.jpeg?fit=crop&h=1200",
              landscape: "https://images.pexels.com/photos/1/pexels-photo-1.jpeg?fit=crop&w=1200",
              tiny: "https://images.pexels.com/photos/1/pexels-photo-1.jpeg?w=280",
            },
            liked: false,
            alt: "Photo by John",
          },
        ]}
      />
    );

    // Only checks hardcoded alt text — will fail as soon as ImageCard changes
    expect(screen.getByAltText("Photo by John")).toBeInTheDocument();
  });
});
