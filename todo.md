


postgresql   =>   db 
prisma   => 
Lucia   =>  Next.js projelerinde basit ve özelleştirilebilir bir kimlik doğrulama aracıdır.
tiptap  => icerik duzenleme?








 <!--?  notes  -->

* sql tabloaları kucuk harfle başlar .
* 





bak
flatmap

<!--?  --YAPILANLAR-- -->


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
- prisma da follow tablosu olusturuldu. / apiler yazıldı get, create, edit, delete
- Takip et / çıkar özelliği eklendi ve optimistik güncelleme kullanıldı.
- user profil bitti 
- Linkify kütüphanesi kullanılarak post içerisindeki hashtag'ler ve kullanıcı adları link haline getirildi.
- userAvatar, username ve linklere tooltip eklendi.
- img yuklemesi icin  uploadthing  kulanıldı ve amazon 3 kulanılacak  ve image kesemek icin react-cropper kutuphanesi kulanıldı.
- profil guncelleme yapıldı
- gonderi olusturmada image ve video ekleme entegre edildi
- "useDropzone" kütüphanesi ile input dosya alanına sürükle-bırak ve yapıştır yoluyla medya ekleme
- canlı ortamda Veritabanında ve Uploadthing de kullanılmayan medya dosyalarını silinecek
- post detail yapıldı 






sayfa sonuna geli,nce 200 kaldır




----utils kontrol et neden props geciliyor.





-----------------------------------------------------------------------------------------------------------------------------
<!-- * useQueryClient  kulanımı -->
//  

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
    onMutate: async (newPost) => {
      // Mutasyon öncesi mevcut durumu iptal et
      await queryClient.cancelQueries(["post-feed", "for-you"]);

      // Önceki durumu al
      const previousData = queryClient.getQueryData(["post-feed", "for-you"]);

      // Yeni veriyi hemen arayüze ekle
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

      // Hata durumunda önceki duruma dön
      return { previousData };
    },
    onSuccess: () => {
      toast({ description: "Gönderi başarıyla oluşturuldu" });
    },
    onError: (error, newPost, context) => {
      // Hata durumunda önceki duruma geri dön
      queryClient.setQueryData(["post-feed", "for-you"], context.previousData);
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

-----------------------------------------------------------------------------------------------------------------------------




///////////
<!--* Tailwind -->
ana div uzerine gelince hover olması, ana div ref ver(group-hover)  =>  group-hover/post:opacity-100



///////////
<!--* queryClient -->
-const queryFilter: QueryFilters = { queryKey: ["post-feed"] };  ==>  queryClient üzerinden ilgili sorguların cache'deki verilerini yönetebiliyorsunuz. Örneğin, bu anahtara sahip sorguları iptal edebilir,       güncelleyebilir  veya yeniden fetch edebilirsiniz.

- queryClient calısma mantıgı =>  onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}



///////// 
<!--*Prisma   -->

- prisma.upsert       =>  prismada eğer belirtilen kayıt zaten mevcutsa, onu günceller; eğer mevcut değilse, yeni bir kayıt oluşturur.

- prisma.delete:      =>  Tekil bir kaydı siler; belirli bir kayıt için kullanılır.
- prisma.deleteMany   =>  Birden fazla kaydı siler; bir dizi kaydı belirli koşullara göre hedef alır.
- NOT                 =>  Belirtilen koşulun tam tersi olan verileri seçer. Yani, koşulu sağlamayan tüm kayıtları getirir.  ("giriş yapan kulanıcı haricindekileri al")
- none                =>  İlişkili bir tabloda belirtilen koşula uyan hiçbir kayıt olmadığında kullanılır. Yani, koşula uyan hiçbir kayıt yoksa, bu şartı sağlar. ("takip edilmeyen kulanıcı gonderilerini al")
-  in                 =>  id degerleri eşit olanları getir
