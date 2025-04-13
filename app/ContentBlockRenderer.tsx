import { ContentBlock } from '@/types/blog';

export const ContentBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case 'text':
      return <p className="text-[20px] font-normal mb-6 text-[#474747]">{block.text}</p>;
    
    case 'image':
      return (
        <div className="my-6 flex flex-col items-center">
          <img
            src={block.src}
            alt={block.alt || ''}
            className="rounded-lg w-full max-w-[936px]"
          />
          {block.caption && (
            <p className="text-[16px] text-[#777777] mt-2">{block.caption}</p>
          )}
        </div>
      );
    
    case 'video':
      return (
        <div className="my-6 aspect-w-16 aspect-h-9">
          <iframe 
            width="100%" 
            height="400"
            src={block.url}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="rounded-lg"
          ></iframe>
          {block.caption && (
            <p className="text-[16px] text-[#777777] mt-2">{block.caption}</p>
          )}
        </div>
      );
    
    case 'quote':
      return (
        <div className="my-6 pl-6 border-l-4 border-[#DFDFDF]">
          <p className="text-[20px] italic font-normal text-[#474747] mb-2">{block.text}</p>
          {block.author && (
            <p className="text-[16px] text-[#777777]">— {block.author}</p>
          )}
        </div>
      );
    
    case 'heading':
      switch (block.level) {
        case 1:
          return <h1 className="text-[28px] font-normal mb-4 mt-8 text-[#474747]">{block.text}</h1>;
        case 2:
          return <h2 className="text-[23px] font-normal mb-4 mt-6 text-[#474747]">{block.text}</h2>;
        case 3:
          return <h3 className="text-[20px] font-medium mb-3 mt-4 text-[#474747]">{block.text}</h3>;
      }
    
    case 'list':
      if (block.style === 'bullet') {
        return (
          <ul className="list-disc pl-8 mb-6">
            {block.items.map((item, index) => (
              <li key={index} className="mb-2">
                <p className="text-[20px] font-normal text-[#474747]">{item}</p>
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <ol className="list-decimal pl-8 mb-6">
            {block.items.map((item, index) => (
              <li key={index} className="mb-2">
                <p className="text-[20px] font-normal text-[#474747]">{item}</p>
              </li>
            ))}
          </ol>
        );
      }
  }
};