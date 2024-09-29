

// (props: ChannelPreviewUIComponentProps) => {
//     const [isHovered, setIsHovered] = useState(false); // Üzerine gelme durumu için state

//     // Mesajı silme işlevi
//     const handleDelete = async (messageId: string) => {
//       try {
//         const response = await fetch("/api/delete-message", {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ messageId }),
//         });

//         if (!response.ok) {
//           throw new Error("Mesaj silme başarısız oldu.");
//         }

//         const result = await response.json();
//         console.log(`Mesaj ${messageId} başarıyla silindi:`, result);
//       } catch (error) {
//         console.error("Mesaj silme hatası:", error);
//       }
//     };

//     return (
//       <div
//         onMouseEnter={() => setIsHovered(true)} // Üzerine gelindiğinde
//         onMouseLeave={() => setIsHovered(false)} // Üzerinden çıkıldığında
//         className="relative"
//       >
//         <ChannelPreviewMessenger
//           {...props}
//           onSelect={() => {
//             props.setActiveChannel?.(props.channel, props.watchers);
//             onClose();
//           }}
//         />
//         {isHovered && (
//           <Button
//             size="icon"
//             variant="ghost"
//             className="absolute right-2 top-2" // Sağ üst köşeye yerleştirme
//             onClick={() => handleDelete("as")} // Silme işlevini tetikler
//             title="Mesajı Sil"
//           >
//             <Trash className="size-4 text-red-500" /> {/* Silme ikonu */}
//           </Button>
//         )}
//       </div>
//     );
//   },
//   [onClose],
// );