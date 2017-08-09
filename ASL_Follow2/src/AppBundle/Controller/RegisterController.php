<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Email as EmailConstraint;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
 
class RegisterController extends Controller
{
    /**
     * @Route("/register", name="register")
     */
    public function indexAction(Request $request)
    {
        return $this->render('register.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            
            //
            'currentRoute' => 'register',
        ]);
    }

    /**
    * @Route("/register/registerForm", name="registerForm")
    */
    public function registerForm(Request $request) {
        $form = $this->createFormBuilder(null)
            ->setAction($this->generateUrl("registerForm"))
            ->add("name", TextType::class, array("required"=>true, "constraints"=>[new NotBlank(array("message"=>"Can not be blank"))]))
            ->add("email", TextType::class, array("required"=>true, "constraints"=>[new EmailConstraint(array("message"=>"Email in wrong format")), new NotBlank(array("message"=>"Can not be blank"))]))
            ->add("myfile", FileType::class, array("constraints"=>[
                new File(array(
                    'maxSize' => '2M',
                    'mimeTypes' => [
                        'application/pdf',
                        'application/x-pdf'
                    ],
                    'mimeTypesMessage' => 'Please upload a valid PDF' 
                ))
            ]))
            ->add("save", SubmitType::class)
            ->getForm();
        
        $form->handleRequest($request);
        
        if($request->isMethod("POST")){
            if($form->isValid()){
                $file = $form->get("myfile")->getData();
                $filename = md5(uniqid ()).".".$file->guessExtension();
                $file->move("/Users/Nicole/ASL", $filename);
                
                return $this->render('registerDone.html.twig', [
                    'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
                    
                    //
                    'currentRoute' => 'registerDone',
        ]);
            }
        }
        
        return $this->render('register.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            
            //
            'currentRoute' => 'register',
            'form' => $form -> createView(),
        ]);
    }
}