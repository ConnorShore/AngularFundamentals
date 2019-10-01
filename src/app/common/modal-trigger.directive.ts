import { Directive, OnInit, Inject, ElementRef, Input } from "@angular/core";
import { JQ_TOKEN } from './jQuery.service';


@Directive({
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {  

    private el: HTMLElement;
    @Input('modal-trigger') modalId: string;    //get the input value of modal-trigger and assign it to modalId

    constructor(@Inject(JQ_TOKEN) private $: any, elRef: ElementRef) {
        this.el = elRef.nativeElement;
    }

    ngOnInit() {
        this.el.addEventListener('click', e => {
            this.$('#' + this.modalId).modal({});
        })
    }
}