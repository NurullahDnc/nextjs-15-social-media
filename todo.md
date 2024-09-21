


postgresql   =>   db 
prisma   => 
Lucia   =>  Next.js projelerinde basit ve özelleştirilebilir bir kimlik doğrulama aracıdır.
tiptap  => icerik duzenleme?








//notes: 

* sql tabloaları kucuk harfle başlar .
* 





bak

flatmap

/////////--YAPILANLAR--


- Kimlik doğrulama işlemleri gerçekleştirildi, Lucia kullanıldı.
- Layout, session provider ile sarmalandı.
- Navbar oluşturuldu; arama butonu ve kullanıcı için açılır menü eklendi.
- Karanlık mod, UI.shadcn ile eklendi.
- MenuBar oluşturuldu; mobil ekranlarda sayfanın altında, büyük ekranlarda sol üstte gösterilecek.
- Tiptap  editor kulanıldı ve post olusturuldu
- olustuurlan postlar ekranda gosterildi
- arkadaslar ekleme comporetti ekledni
- suspanse eklendi 
- trend # comporetni eklendi sql sorgusu yazıldı.
- useQuery kulanıldı ve post cekildi - data cekerken benzersiz key ver  delete create isleminde o key ile gecersiz kıl yeninden sorgu yap
- anasayfada asagıya indikce postlar  cekildi, 
- Post oluşturulduktan sonra useMutation ile UI güncellendi. Bu, kullanıcıya yeni gönderinin hemen görünmesini sağlar.
- Gönderi silme için useMutation fonksiyonu yazıldı.
- Gönderi silme işlemi gerçekleştirildi ve modal açıldı.








sayfa sonuna geli,nce 200 kaldır






-----------------------------------------------------------------------------------------------------------------------------
// -useQueryClient  kulanımı 

(setQueryData: Mutasyon başarıyla tamamlandıktan sonra, yeni gönderi eklenerek mevcut veriler güncelleniyor.)

/*


!!submit func!!

--
 mutation.mutate(input, {  
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
--

!!mutation func!!

--
export function useSubmitPostMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: (newPost) => {
      // Post oluşturulduktan sonra veri güncelleniyor
      queryClient.setQueryData(["post-feed", "for-you"], (oldData) => ({
        ...oldData,
        pages: [
          {
            posts: [newPost, ...(oldData.pages[0]?.posts || [])],
            nextCursor: oldData.pages[0]?.nextCursor,
          },
          ...oldData.pages.slice(1),
        ],
      }));
      toast({ description: "Gönderi başarıyla oluşturuldu" });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Gönderi oluşturulamadı. Lütfen tekrar deneyin.",
      });
    },
  });

  return mutation;
}
--

*/

////////////

const queryFilter: QueryFilters = { queryKey: ["post-feed"] };  ==>  queryClient üzerinden ilgili sorguların cache'deki verilerini yönetebiliyorsunuz. Örneğin, bu anahtara sahip sorguları iptal edebilir, güncelleyebilir veya yeniden fetch edebilirsiniz.


///////////

ana div uzerine gelince hover olması, ana div ref ver(group-hover)  =>  group-hover/post:opacity-100

queryClient calısma mantıgı =>  onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}


