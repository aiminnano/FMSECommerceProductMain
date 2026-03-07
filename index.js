

    const thumbnail = document.querySelectorAll('.img-container');
    const showcaseImage = document.querySelector('.display-img');
    const showcaseImageL = document.querySelector('.on-lightbox')
    const lightboxContainer = document.querySelector('.lightbox-container');
    const xButton = document.querySelectorAll('.close-action');
    const lightboxThumbImgCont = document.querySelector('.thumbnail-lightbox');
    const cartItems = document.querySelector('.cart-item-view');
    const quantity = document.querySelector('.quantity-value');
    const lightboxThumbImg = lightboxThumbImgCont.querySelectorAll('.img-container');
    const showcaseImageOnBoth = document.querySelectorAll('.current-img-sync');
    const dThumbnail = document.querySelector('.thumbnail-img');
    const desktopThumbnail = dThumbnail.querySelectorAll('.img-container');
    const mobileMenuCont = document.querySelector('.mobile-menu-container');
    const cartQuantity = document.querySelector('.dynamic-quantity');
    
    let value = 1;
    let cartValue = 0;

    const products = [
        {
            id: 1,
            name: "Full Limited Edition Sneakers",
            price: 125
        }
    ]

    let cart = [];


    thumbnail.forEach(btn => {
        btn.querySelector('.img').addEventListener('click', () => {
            const container = btn.closest('.thumbnail-img');

            document.querySelectorAll('.img-container').forEach(div => {
                div.classList.remove('active');
                div.setAttribute('aria-checked','false');
                
            });
            

            btn.classList.add('active');
            btn.setAttribute('aria-checked','true'); 

            
            
            const selected = document.querySelector('.img-container[aria-checked="true"]');
            const selectedImage = selected.dataset.value;
            value = parseFloat(selected.dataset.value);
            
            const selectedThumbnailLB = lightboxThumbImg[value-1];
            if(selectedThumbnailLB){     
                selectedThumbnailLB.setAttribute('aria-checked','true');
                selectedThumbnailLB.classList.add('active');    
            }

            
            /*showcaseImage.src = `./images/image-product-${selectedImage}.jpg`;
            showcaseImage.dataset.value = selectedImage;
            showcaseImageL.src = `./images/image-product-${value}.jpg`;
            console.log('thumbnail')*/

            
            const selectedThumbnailD = desktopThumbnail[value-1];

            if(selectedThumbnailD){
                selectedThumbnailD.setAttribute('aria-checked','true');
                selectedThumbnailD.classList.add('active');
            }
            
            changeCurrentImage(selectedImage);
        });
    });

    showcaseImage.addEventListener('click', () => {
        lightboxContainer.classList.add('show');
    });
    


    document.addEventListener('click', (e) => {

        const previous = e.target.closest('.prev-action');
        const next = e.target.closest('.next-action');
        const cartImg = e.target.closest('.cart-img');
        const minus = e.target.closest('.minus');
        const plus = e.target.closest('.plus');
        const addtocartButton = e.target.closest('.addtocart-button');
        const deleteItem = e.target.closest('.delete-item');
        const mobileMenu = e.target.closest('.mobile-menu-button');
        const closeButton = e.target.closest('.close-action');

        const backdropClick = e.target.closest('.backdrop');
        const backdropMobile = e.target.closest('.b-m-menu');
        let itemQuantity = parseFloat(quantity.value);
        let productId = parseFloat(quantity.dataset.productid)
        const selectedIdIndex = productId - 1;
        
        if(previous){
            

            document.querySelectorAll('.img-container').forEach(img => {
                img.setAttribute('aria-checked','false');
                img.classList.remove('active');
                console.log('remove working!!!')
            });

            if(value >= 1){
                --value;
                changeCurrentImage(value);
                
                console.log("IMAGE VALUE " + value);



                console.log('LIGHTBOX VALUE ' + value)

                const selectedThumbnail = lightboxThumbImg[value-1];
                if(selectedThumbnail){
                    selectedThumbnail.setAttribute('aria-checked','true');
                    selectedThumbnail.classList.add('active');
                }

                const selectedThumbnailD = desktopThumbnail[value-1];
                if(selectedThumbnailD){
                    selectedThumbnailD.setAttribute('aria-checked','true');
                    selectedThumbnailD.classList.add('active');
                }

                if(value === 0){
                    value += 4;

                    changeCurrentImage(value);

                    console.log('LIGHTBOX VALUE zero' + value)    
                    const selectedThumbnail = lightboxThumbImg[value-1];

                    if(selectedThumbnail){
                        selectedThumbnail.setAttribute('aria-checked','true');
                        selectedThumbnail.classList.add('active');
                    }

                    const selectedThumbnailD = desktopThumbnail[value-1];

                    if(selectedThumbnailD){
                        selectedThumbnailD.setAttribute('aria-checked','true');
                        selectedThumbnailD.classList.add('active');
                    }
                    
                }
                
            }

            
            

        }
        if(next){

            document.querySelectorAll('.img-container').forEach(img => {
                img.setAttribute('aria-checked','false');
                img.classList.remove('active');
                console.log('remove working!!!')
            });

            if(value <= 4){
                ++value;
                changeCurrentImage(value);
                console.log("add "+ value);

                const selectedThumbnail = lightboxThumbImg[value-1];
                if(selectedThumbnail){
                    selectedThumbnail.setAttribute('aria-checked','true');
                    selectedThumbnail.classList.add('active');
                }
                
                const selectedThumbnailD = desktopThumbnail[value-1];
                if(selectedThumbnailD){
                    selectedThumbnailD.setAttribute('aria-checked','true');
                    selectedThumbnailD.classList.add('active');
                }


                if(value === 5){
                
                    console.log("4 "+value);
                    value -= 4;
                    changeCurrentImage(value);

                    const selectedThumbnail = lightboxThumbImg[value-1];
                    if(selectedThumbnail){
                    selectedThumbnail.setAttribute('aria-checked','true');
                    selectedThumbnail.classList.add('active');
                    }

                    const selectedThumbnailD = desktopThumbnail[value-1];
                    if(selectedThumbnailD){
                        selectedThumbnailD.setAttribute('aria-checked','true');
                        selectedThumbnailD.classList.add('active');
                    }
                } 
            } 
            
        }

        if(cartImg){
            cartItems.classList.toggle('show');

        }

        if(minus){
            quantity.stepDown();
            itemQuantity = parseFloat(quantity.value);
        }
        if(plus){
            quantity.stepUp();
            itemQuantity = parseFloat(quantity.value);
        }

        if(addtocartButton){
            
            console.log(cart);
            addItemToCart(selectedIdIndex, itemQuantity);
        }

        if(deleteItem){
            document.querySelector('.item-in-cart-container').remove();
            document.querySelector('.cart-item-placeholder').classList.remove('hide')
            cartQuantity.classList.remove('show');
            
            deleteOnArray(productId);
            console.log(cart);
        }

        if(backdropClick){
            lightboxContainer.classList.remove('show');
        }

        if(mobileMenu){
            mobileMenuCont.classList.add('show');
        }

        if(backdropMobile){
            mobileMenuCont.classList.remove('show');
        }

        if(closeButton){
            lightboxContainer.classList.remove('show');
            mobileMenuCont.classList.remove('show');
        }
    });

    function changeCurrentImage(val){
        showcaseImageOnBoth.forEach(sync => {
            sync.style.opacity = '0';

            setTimeout(() =>{
                sync.src = `./images/image-product-${val}.jpg`;

                setTimeout(() => {
                    sync.style.opacity = '1';
                    console.log('TIMEOUT')
                }, 10);
            }, 120);
        })
    }

    function addItemToCart(index, cQuantity){
        const selectedProduct = products[index];
        const existingProduct = cart.find(c => c.id === selectedProduct.id)
        let totalCartQuantity = 0;
        

        const placeholder = document.querySelector('.cart-item-placeholder');
        placeholder.classList.add('hide');

        const itemInCartContainer = document.createElement('div');
        itemInCartContainer.className = 'item-in-cart-container'

        const itemInCart = document.createElement('div');
        itemInCart.className = 'item-in-cart';

        const itemImg = document.createElement('img');
        itemImg.src = './images/image-product-1-thumbnail.jpg';
        itemImg.className = 'item-cart-img';

        const cartItemDetails = document.createElement('div');
        cartItemDetails.className = 'cart-item-details';

        const itemName = document.createElement('div');
        itemName.className = 'item-name';

        const itemDeetsContainer = document.createElement('div');
        itemDeetsContainer.className = 'item-deets-container';

        const itemPrice = document.createElement('div');
        itemPrice.className = 'item-price';

        const itemQuantity = document.createElement('div');
        itemQuantity.className = 'item-quantity';

        const itemTotalPrice = document.createElement('div');
        itemTotalPrice.className = 'item-total-price';

        const deleteImg = document.createElement('img');
        deleteImg.src = './images/icon-delete.svg';
        deleteImg.className = 'delete-item';

        const chkoutButton = document.createElement('button');
        chkoutButton.className = 'chkout-button';
        chkoutButton.textContent = 'Checkout';

        if(existingProduct){
            existingProduct.quantity += cQuantity;
            existingProduct.total = existingProduct.quantity * existingProduct.price;

            console.log(existingProduct.quantity);

            for(let i = 0; i < cart.length; i++){
                totalCartQuantity += cart[i].quantity;
            }
            
            cartQuantity.textContent = `${totalCartQuantity}`;
            
            const updateItem = document.querySelector(`.item-in-cart[data-id ="${selectedProduct.id}"`)
            
            if(updateItem){
                updateItem.querySelector('.item-quantity').textContent = `x ${existingProduct.quantity}`;
                updateItem.querySelector('.item-total-price').textContent = `$${existingProduct.total.toFixed(2)}`;
                console.log('working')
            }

        }else {

            cart.push({
                id: products[index].id,
                name: products[index].name,
                price: products[index].price,
                quantity: cQuantity,
                total: products[index].price * cQuantity
            });
        placeholder.after(itemInCartContainer);
        itemInCartContainer.appendChild(itemInCart);
        itemInCart.appendChild(itemImg);
        itemImg.after(cartItemDetails);
        cartItemDetails.appendChild(itemName);
        itemName.after(itemDeetsContainer);
        itemDeetsContainer.appendChild(itemPrice);
        itemPrice.after(itemQuantity);
        itemQuantity.after(itemTotalPrice);
        cartItemDetails.after(deleteImg);
        itemInCart.after(chkoutButton);
        
        itemInCart.dataset.id = selectedProduct.id;

        itemName.textContent = `${cart[index].name}`;
        itemPrice.textContent = `$${cart[index].price.toFixed(2)}`;
        itemQuantity.textContent = `x ${cart[index].quantity}`;
        itemTotalPrice.textContent = `$${cart[index].total.toFixed(2)}`;
        
        totalCartQuantity += cQuantity;
        cartQuantity.classList.add('show');
        cartQuantity.textContent = `${totalCartQuantity}`;
        }
    }


    function deleteOnArray(productId){
        cart = cart.filter(item => item.id !== productId)
    }

    const mobileSize = window.matchMedia("(max-width: 375px)");

    function mQChange (e){
        console.log('mqworking')

        lightboxContainer.classList.remove('show');

        
    }

    mQChange(mobileSize);

    mobileSize.addEventListener('change', mQChange);